# Product Requirements Document (PRD): Anaira Glamping Production Readiness & Completion

## 1. Introduction / Overview
Dokumen ini mendefinisikan persyaratan untuk meningkatkan aplikasi **Anaira Glamping PMS & Booking Center** dari status purwarupa berbasis penyimpanan lokal (*localStorage*) menjadi aplikasi kelas produksi (*production-ready*) dengan integrasi basis data ganda (Supabase/MySQL), sistem manajemen voucher diskon, pengunggahan gambar langsung dari komputer pengelola, opsi multi-bahasa, serta halaman detail kamar yang dinamis dan ramah SEO.

Proyek ini bertujuan untuk memberikan pengalaman pemesanan yang lancar untuk para tamu dan kemudahan pengelolaan inventaris villa bagi pihak pengelola.

---

## 2. Goals
- **Kesiapan Produksi Tanpa Hambatan:** Mengubah alur penyimpanan lokal statis menjadi interaksi database dinamis (Supabase PostgreSQL / MySQL Shared Hosting) dengan fallback otomatis (Demo Mode).
- **Pengamanan Samaran (Obfuscated Portal):** Portal admin tersamar di halaman `login.html` (Manage Booking) yang mendeteksi masukan kata sandi secara kondisional bila nama admin dimasukkan.
- **Manajemen Galeri Mandiri:** Memungkinkan admin mengunggah foto villa langsung dari PC untuk ditampilkan di halaman utama dan galeri kamar.
- **Redeem Kode Voucher & Fleksibilitas Harga:** Pengunjung dapat memasukkan kode voucher di halaman pembayaran untuk mendapatkan diskon langsung berbasis nominal Rupiah atau persentase.
- **Halaman Kamar Ramah SEO:** Menghasilkan halaman spesifik untuk tiap tipe kamar secara dinamis ke subfolder `rooms/` untuk optimasi mesin pencari Google.

---

## 3. User Stories
- **Sebagai Pengunjung:** Saya ingin mencari kamar, melihat detail fasilitas dan galeri foto kamar, memilih tanggal menginap, memasukkan kode voucher diskon, melakukan pembayaran simulasi/nyata, dan mengunduh tanda terima PDF pemesanan.
- **Sebagai Pengunjung:** Saya ingin mengakses kembali rincian pemesanan saya secara instan dengan memasukkan ID Pemesanan di kolom "Manage Booking" di halaman login tanpa perlu mendaftar akun rumit.
- **Sebagai Pengelola (Admin):** Saya ingin masuk ke sistem PMS dengan mengetikkan nama admin di kolom pencarian booking, memasukkan kata sandi rahasia, melihat metrik hunian kamar, mengelola inventaris (kamar, fasilitas, harga diskon, kode voucher), serta mengunggah galeri foto villa langsung dari komputer saya.

---

## 4. Functional Requirements

### 4.1. Portal Login Tersamar ("Manage Booking")
1. Halaman `login.html` diubah namanya atau diposisikan sebagai portal **"Manage Booking"**.
2. **Perilaku Kolom Input:**
   - Menyediakan satu kolom utama: `Booking ID / Username`.
   - Jika pengguna mengetikkan kata kunci khusus pengelola (`admin`), bidang input kata sandi (`Password`) dan tombol masuk admin akan muncul secara visual dengan animasi halus.
   - Jika pengguna memasukkan ID Pemesanan reguler (format `ANR-2026-XXXXX`), sistem akan langsung memvalidasi ID tersebut ke basis data/localStorage dan menampilkan detail reservasi tamu tanpa kolom sandi.

### 4.2. Detail Kamar Dinamis & SEO-Friendly
1. Sistem harus menghasilkan halaman dinamis di subfolder `rooms/` untuk tipe kamar utama:
   - `rooms/balcony.html` (Anaira Balcony Suite)
   - `rooms/porch.html` (Anaira Porch Suite)
   - `rooms/villa.html` (Anaira Executive Villa)
2. **Fitur Halaman Kamar:**
   - Galeri foto tipe kamar khusus yang dapat digeser.
   - Deskripsi mendalam, kelengkapan fasilitas dalam bentuk checklist.
   - Panel cek ketersediaan tanggal langsung dan opsi tombol booking cepat yang melempar parameter kamar ke wizard pemesanan.
   - Penanganan tag meta SEO dinamis (Title, Description, OpenGraph tags) di masing-masing file HTML.

### 4.3. Skema Basis Data Relasional Ganda (SQL Dual-Mode)
1. Menyediakan berkas `schema.sql` terpadu yang kompatibel dengan:
   - **Supabase (PostgreSQL):** Untuk deploy di Vercel.
   - **MySQL / MariaDB:** Untuk deploy di Shared Hosting konvensional.
2. **Struktur Tabel:**
   - `anaira_bookings`: Menyimpan reservasi tamu (ID, nama, email, WA, tipe kamar, check-in, check-out, jumlah malam, total harga, status bayar).
   - `anaira_rooms`: Inventaris kamar (ID, nama, deskripsi, harga_weekday, harga_weekend, fasilitas, foto).
   - `anaira_vouchers`: Daftar voucher diskon (ID, kode, tipe [persen/nominal], nilai, batas_pakai, status_aktif).
   - `anaira_settings`: Konfigurasi global situs (kontak, alamat, koordinat maps).

### 4.4. Opsi Multi-Language (EN/ID)
1. Menyediakan tombol alih bahasa (ID/EN) yang melayang (*floating flag switch*) di setiap halaman frontend utama.
2. Penerjemahan mencakup seluruh teks statis halaman, tombol navigasi, label formulir booking, dan petunjuk pembayaran.

### 4.5. Pengunggahan Foto dari Komputer (PC Upload)
1. Di bagian manajemen galeri dasbor PMS, admin dapat mengklik tombol "Pilih Berkas" untuk mengunggah foto baru format JPG/PNG/WebP langsung dari komputernya.
2. Di Mode Demo/Lokal: File disimpan di folder `assets/images/uploads/` melalui Node.js backend.
3. Di Mode Live: Mengunggah gambar ke Storage Bucket Supabase atau API eksternal, dan memperbarui path galeri di database.

### 4.6. Fitur Manajemen Voucher & Reduksi Harga
1. Dasbor PMS memiliki tab **"Voucher"** baru untuk membuat, mengubah status aktif, dan menghapus kode kupon.
2. Di halaman `booking.html` Langkah 4 (Pembayaran), disediakan kolom input **"Kode Voucher"** sebelum checkout.
3. Jika kode valid, sistem memotong tagihan total secara instan dengan indikator visual sukses, lalu menyimpan rincian pemotongan harga ke dalam data reservasi.

---

## 5. Non-Goals / Out of Scope
- Integrasi server email SMTP komersial skala besar (hanya disediakan modul simulasi pengiriman email lokal dan file download PDF invoice langsung).
- Sistem pemrosesan kartu kredit PCI-DSS langsung di frontend (transaksi kartu kredit mutlak didelegasikan ke modal Snap Midtrans atau tautan Invoice Xendit).

---

## 6. Design Considerations
- **Estetika Visual:** Pertahankan palet warna deep forest green (#1b4332), nuansa emas mewah (#d4af37), efek glassmorphism tingkat tinggi, gradien halus, bintang berkilau, dan transisi hover mikro yang responsif di perangkat seluler.
- **Integrasi Peta Konten:** Jika admin memasukkan URL Google Maps di pengaturan, tampilkan kotak iFrame peta kecil di halaman kontak. Jika iFrame tersebut diklik oleh pengguna, buka peta secara penuh di tab browser baru.

---

## 7. Technical Considerations
- **Demo Mode vs Live Mode Toggle:** Disediakan sakelar rahasia atau parameter konfigurasi di `scripts/anaira-data-lib.js` untuk beralih mode.
  - **Demo Mode (default local):** Menghubungkan penyimpanan ke `localStorage` dan server simulasi Node.js.
  - **Live Mode:** Menghubungkan pembacaan/penulisan langsung ke API basis data SQL nyata.
- **Keamanan Input:** Seluruh parameter input kueri SQL wajib menggunakan kueri berparameter (*prepared statements* / `pSQL()`) untuk menghindari ancaman SQL Injection.

---

## 8. Success Metrics
- Halaman detail kamar terindeks sempurna oleh mesin pencari Google (SEO Valid).
- Alur pemesanan selesai kurang dari 2 menit sejak pilih kamar hingga simulasi/real pembayaran.
- Dasbor pengelola PMS mampu menyinkronkan data pemesanan tamu dari database terpusat secara instan.

---

## 9. Open Questions
1. *Bagaimanakah preferensi penyimpanan gambar pada Live Mode saat dideploy di Vercel?*
   - **Pilihan Terpilih (Inferred):** Menggunakan Supabase Storage Bucket atau Base64 fallback jika folder statis Vercel bersifat *Read-Only*.
