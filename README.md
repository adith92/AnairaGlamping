# Anaira Glamping & Resort Booking System

Sistem reservasi glamping berbasis **QloApps** dengan integrasi template Hotelier.

## Fitur
- Manajemen kamar glamping (Balcony, Porch, Villa)
- Integrasi pembayaran **Midtrans (Snap/QRIS)**
- Integrasi pembayaran **Xendit (Invoice)**
- Paket tambahan: breakfast, BBQ, honeymoon, family
- Tombol booking WhatsApp
- Front-end responsif (static Hotelier pages)

## Requirement
- PHP 8.1
- MySQL 8.0
- Composer 2.x
- Node.js 18+ (opsional untuk front-end toolchain)

## Instalasi Lokal
1. Clone repo lalu checkout branch develop/feature.
2. Jalankan dependency backend: `composer install`.
3. Buat database MySQL dan konfigurasi `app/config/parameters.php`.
4. Import schema QloApps dan jalankan seed:
   - `mysql -u root -p dbname < data/seed_anaira.sql`
5. Aktifkan modul `midtranspayment` dan `xenditpayment` di admin QloApps.
6. Isi konfigurasi API key di halaman modul.

## Konfigurasi Payment
- Midtrans: ServerKey, ClientKey, Environment
- Xendit: API Key, Callback Token, Environment
- Callback URL set ke endpoint module front controller validation.

## Deploy
### Front-end statis (Vercel)
1. Masuk ke folder `frontend/hotelier`
2. Jalankan `vercel deploy --prod`
3. Map domain ke `anairaglamping.vercel.app` atau custom domain.

### Backend PHP (Shared Hosting)
1. Upload source backend (exclude `frontend` bila ingin pisah deployment)
2. Buat database dan import `data/seed_anaira.sql`
3. Update `app/config/parameters.php`
4. Pastikan cron/SSL/domain aktif.

## Catatan
Setelah domain `AnairaGlamping.com` aktif, update URL callback payment gateway dan URL booking di front-end.
