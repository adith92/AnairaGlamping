<?php
/**
 * ============================================================================
 * Anaira Glamping & Resort — Shared Hosting MySQL API Bridge
 * ============================================================================
 *
 * File jembatan API PHP-MySQL ultra-aman untuk mendukung "Live Mode" database
 * pada Shared Hosting (cPanel/Plesk) dan Vercel.
 *
 * Struktur Tabel MySQL yang dibutuhkan:
 *   CREATE TABLE IF NOT EXISTS `anaira_store` (
 *     `key` VARCHAR(100) NOT NULL,
 *     `data` LONGTEXT NOT NULL,
 *     PRIMARY KEY (`key`)
 *   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 *
 * ============================================================================
 */

// 1. CORS Headers (Izinkan Vercel dan Shared Hosting untuk melakukan request)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Tangani OPTIONS pre-flight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Hanya izinkan request POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed. Hanya request POST yang diizinkan."));
    exit();
}

// 2. Database Kredensial (Silakan sesuaikan dengan database cPanel / Shared Hosting Anda)
define('DB_HOST', 'localhost');
define('DB_NAME', 'anaira_db');
define('DB_USER', 'anaira_user');
define('DB_PASS', 'KatasandiDbAnda123!'); // Disarankan menggunakan password kuat

try {
    // Koneksi menggunakan PDO (PHP Data Objects) demi keamanan SQL Injection
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        )
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Koneksi database gagal: " . $e->getMessage()));
    exit();
}

// 3. Membaca & Memproses Payload JSON
$inputData = file_get_contents("php://input");
$request = json_decode($inputData, true);

if (!$request || !isset($request['table']) || !isset($request['action'])) {
    http_response_code(400);
    echo json_encode(array("error" => "Bad Request. Payload JSON tidak lengkap. Butuh 'table' dan 'action'."));
    exit();
}

$table = preg_replace('/[^a-zA-Z0-9_-]/', '', $request['table']); // Sanitisasi nama tabel
$action = strtoupper($request['action']);
$payload = isset($request['data']) ? $request['data'] : null;

// Pastikan tabel store utama tersedia
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `anaira_store` (
        `key` VARCHAR(100) NOT NULL,
        `data` LONGTEXT NOT NULL,
        PRIMARY KEY (`key`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
} catch (PDOException $e) {
    // Abaikan jika tidak memiliki hak istimewa CREATE TABLE, asumsikan tabel sudah ada
}

// 4. Operasi CRUD Hibrida
if ($action === 'GET') {
    try {
        $stmt = $pdo->prepare("SELECT `data` FROM `anaira_store` WHERE `key` = :key LIMIT 1");
        $stmt->execute(array(':key' => $table));
        $row = $stmt->fetch();
        
        if ($row) {
            $decodedData = json_decode($row['data'], true);
            echo json_encode($decodedData);
        } else {
            echo json_encode(null);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("error" => "Query SELECT gagal: " . $e->getMessage()));
    }
} 
elseif ($action === 'POST') {
    if ($payload === null) {
        http_response_code(400);
        echo json_encode(array("error" => "Bad Request. Payload 'data' kosong untuk aksi POST."));
        exit();
    }
    
    try {
        // Simpan data sebagai string JSON ter-enkode
        $jsonString = json_encode($payload);
        
        // Gunakan ON DUPLICATE KEY UPDATE (Upsert) agar data key yang sama diperbarui otomatis
        $stmt = $pdo->prepare("INSERT INTO `anaira_store` (`key`, `data`) VALUES (:key, :data) 
                               ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)");
        $result = $stmt->execute(array(
            ':key'  => $table,
            ':data' => $jsonString
        ));
        
        if ($result) {
            echo json_encode(array("ok" => true, "message" => "Data berhasil disimpan ke SQL Database."));
        } else {
            http_response_code(500);
            echo json_encode(array("ok" => false, "error" => "Gagal mengeksekusi query UPSERT database."));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("error" => "Query UPSERT gagal: " . $e->getMessage()));
    }
} 
else {
    http_response_code(400);
    echo json_encode(array("error" => "Aksi '" . $action . "' tidak didukung. Gunakan GET atau POST."));
}
?>
