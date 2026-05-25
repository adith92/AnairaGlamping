# Project Baseline: Anaira Glamping PMS & Booking Center

## 1. Project Overview & Name
- **Nama Proyek:** Anaira Glamping PMS & Booking Center
- **Deskripsi:** Aplikasi manajemen properti (PMS) dan pusat pemesanan glamping mewah ramah pengguna yang menggabungkan kecepatan serta kemudahan kustomisasi dari frontend statis premium dengan kesiapan integrasi backend hotel kelas dunia.

---

## 2. Detected Framework & Tech Stack
Proyek ini mengadopsi arsitektur **Ganda (Hybrid Stack)** yang sangat tangguh:

1. **Core Backend (QloApps Core):**
   - **Bahasa:** PHP 8.1–8.4
   - **Arsitektur:** Model-View-Controller (MVC) berbasis modul dan kait (hooks).
   - **Mesin Templating:** Smarty 3.x (berkas `.tpl`).
   - **Basis Data:** MySQL 5.7+ / MariaDB 10.5+.
   - **Dependency Manager:** Composer.
   
2. **Kustom Frontend & PMS (Anaira Frontend):**
   - **Lokasi:** Direktori `frontend/hotelier/`.
   - **Teknologi:** Raw HTML5, Tailwind CSS (via CDN), Lucide Icons, Vanilla JS.
   - **Manajer Paket:** npm (mengelola server pratinjau lokal statis).
   - **Server Pratinjau:** Node.js HTTP Server (`scripts/static-server.js` di port 4173, `scripts/admin-server.js`).
   - **Manajemen Data Frontend:** `anaira-data-lib.js` untuk integrasi `localStorage` dan pemetaan data.

---

## 3. Current Folder Structure Summary
Berikut adalah ringkasan struktur folder utama proyek:

```text
. (Root QloApps Core)
├── classes/                # Core PHP models (ObjectModel)
├── config/                 # Berkas konfigurasi PHP (termasuk secrets)
├── controllers/            # Front & Admin PHP Controllers
├── docs/                   # Dokumen analisis, manual, dan roadmap
├── frontend/
│   └── hotelier/           # Folder utama Frontend Kustom Anaira
│       ├── admin/          # Folder Panel Pengelola / PMS statis (pms.html)
│       ├── assets/         # Aset lokal gambar, ikon, dan logo
│       ├── rooms/          # Subfolder halaman detail kamar statis / dinamis
│       ├── scripts/        # Skrip utilitas server lokal & data library
│       ├── booking.html    # Halaman wizard pemesanan 4-langkah
│       ├── login.html      # Pintu masuk seragam admin & tamu
│       ├── package.json    # Skrip npm pratinjau lokal
│       └── vercel.json     # Konfigurasi deployment & rewrites Vercel
├── modules/                # Fitur modul terisolasi QloApps
├── override/               # Overrides kelas core PHP
├── tasks/                  # [NEW] Folder alur kerja AI Dev Tasks
├── themes/                 # Template Smarty (.tpl) bawaan
└── README.md               # Dokumentasi utama repositori
```

---

## 4. Existing Main Features
- **Aesthetics & UI Premium:** Desain bertema hutan hijau (forest green), efek glassmorphism, floating starry sparkles, blob animasi, dan sepenuhnya responsif di semua resolusi perangkat mobile.
- **Pintu Masuk Samaran (Shared Login):** Satu halaman `login.html` seragam untuk Admin (autofill dengan username `admin`, sandi `221221`) dan Pengunjung (autofill `user@clawx.com` / masuk via ID Booking).
- **Booking Wizard 4-Langkah:** Alur pemesanan interaktif (Pilih Unit, Kalender/Malam, Data Pengunjung dengan validasi nomor WA Indonesia, opsi Metode Pembayaran Midtrans Snap / Xendit / QRIS Indopay).
- **PMS Dashboard & Analytics:** Dasbor pengelola di `admin/pms.html` lengkap dengan kalkulasi pendapatan total, tingkat okupansi kamar (Balcony, Porch, Villa), bagan status reservasi (Paid, Pending, Refunded), serta fitur CRUD Reservasi yang disinkronkan.
- **Content Editor & Local Library:** Pustaka data `anaira-data-lib.js` yang menyatukan parsing data dari `site-content.json` untuk menampilkan informasi secara dinamis di frontend.

---

## 5. Missing or Incomplete Parts
- **Database Terpusat:** Reservasi saat ini masih disimpan di `localStorage` per peramban dan memerlukan sinkronisasi ke SQL asli (Supabase / MySQL Shared Hosting).
- **Otentikasi Server-side:** Pengamanan halaman PMS saat ini baru menggunakan `sessionStorage.getItem('isAdmin') === 'true'` (masih di sisi klien, bukan berbasis JWT/Session PHP di sisi server).
- **Mesin Webhook Live:** Handler untuk menerima respon sukses secara otomatis dari payment gateway Midtrans Snap dan Xendit Invoice.
- **Mesin Pengiriman Email:** SMTP nyata untuk mengirimkan notifikasi beserta lampiran PDF ID Pemesanan kepada tamu.
- **Penyunting Konten Pengelola:** Sistem CMS untuk memudahkan pengelola memperbarui foto dari galeri PC dan mengubah data harga secara visual.

---

## 6. Known Risks
- **Data Desync:** Perbedaan penamaan variabel antara profil tamu di frontend (`guestName`, `checkin`) dan admin PMS (`guest`, `checkIn`). Sudah dimitigasi parsial oleh fungsi mapper `normalizeBookings` di PMS.
- **Keamanan Halaman PMS:** Karena autentikasi masih berbasis *client-side*, pengguna berpengalaman dapat memanipulasi sessionStorage untuk mengakses dasbor. Penting untuk mengaktifkan validasi token server sebelum live.
- **Konflik File Override:** Perubahan langsung pada core QloApps PHP (jika ada) dapat memicu konflik dengan modul lain. Selalu patuhi panduan pengembangan core vs modul di berkas `AGENTS.md`.

---

## 7. Suggested Development Workflow
1. **Analisis Baseline & Aktifkan PRD:** Selalu verifikasi kesesuaian rencana dengan berkas `project-baseline.md`.
2. **Kembangkan per Sub-Tugas:** Lakukan implementasi secara bertahap dan iteratif.
3. **Pencatatan Berkas Cadangan (Backup):** Jangan pernah menimpa berkas konfigurasi kritis tanpa menyalin berkas cadangan bertanda waktu (*timestamped backup*).
4. **Validasi Lokal:** Uji perubahan menggunakan skrip server lokal sebelum melakukan commit.

---

## 8. How to Run Locally
Seluruh perintah dijalankan di dalam direktori kustom frontend `frontend/hotelier/`:

1. **Instal Dependensi:**
   ```bash
   cd frontend/hotelier
   npm install
   ```
2. **Jalankan Preview Server (Static Website & Booking Wizard):**
   ```bash
   npm run dev
   # Server akan berjalan di http://localhost:4173
   ```
3. **Jalankan Admin API Server (Mock Server Konten & Unggahan):**
   ```bash
   npm run admin
   ```
4. **Generate Halaman Dinamis:**
   ```bash
   npm run build:pages
   ```
5. **Gunakan Script All-in-One (Untuk Windows PowerShell):**
   ```powershell
   ./scripts/start-local.ps1
   ```

---

## 9. How to Build & Deploy
- **Build Pages:** Gunakan `node scripts/build-pages.js` untuk membuat berkas halaman statis terbaru dari skema JSON.
- **Vercel Deploy:** Proyek dikonfigurasi menggunakan berkas `vercel.json` dan dapat dideploy langsung ke Vercel dengan perintah `vercel` atau terhubung melalui GitHub Actions.
