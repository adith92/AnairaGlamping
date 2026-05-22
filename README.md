# Anaira Glamping & Resort

Fork dari QloApps untuk sistem booking **Anaira Glamping & Resort** dengan front-end Hotelier responsif dan arsitektur payment Indonesia.

## Fitur Utama
- Booking kamar/unit glamping berbasis QloApps.
- Front-end statis Hotelier siap deploy ke Vercel (`frontend/hotelier`).
- Pembayaran:
  - WhatsApp reservation
  - Manual QRIS (display instruction)
  - Midtrans (Snap/QRIS)
  - Xendit (Invoice)
  - DOKU (adapter plan/stub)
  - Indopay/custom acquirer (stub, menunggu docs resmi)
  - UnionPay-capable provider flow (via acquirer/provider, bukan API palsu langsung)
- Paket tambahan: breakfast, BBQ, honeymoon, family.

## Data Unit
- Balcony: max 4 pax, 6 rooms, AC, Android TV, amenities, weekday Rp500.000, weekend Rp700.000.
- Porch: max 4 pax, 6 rooms, fan/kipas, Android TV, amenities, weekday Rp350.000, weekend Rp420.000.
- Villa: max 20 pax, 1 house, AC, Android TV, kitchen, karaoke set, weekday Rp2.100.000, weekend Rp3.000.000.

## Lokasi & Kebijakan
- Lokasi: Jl. Raya Curug Nangka
- WhatsApp: 081399693499 / 6281399693499
- Check-in 13:00, check-out 12:00
- Early check-in/late checkout menyesuaikan ketersediaan
- Cancellation: DP hangus, bisa reschedule

## Struktur Payment
- `modules/midtranspayment`: implementasi Midtrans.
- `modules/xenditpayment`: implementasi Xendit.
- `modules/anairamultipayment`: modul arsitektur bersama (adapter pattern, unified config baseline, webhook/log helper, provider stubs DOKU/Indopay/UnionPay, manual QRIS).
- `ps_anaira_payment_log`: log transaksi + idempotency event hash.

## Setup Lokal
1. Clone repo, checkout branch.
2. `composer install`
3. Set database di `app/config/parameters.php`
4. Import schema QloApps + `data/seed_anaira.sql`
5. Aktifkan modul payment di admin panel.
6. Isi kredensial provider di konfigurasi modul (sandbox/production).

## Shared Hosting (Backend)
1. Upload source backend.
2. Buat DB + import seed.
3. Update `app/config/parameters.php`.
4. Set HTTPS dan callback URL provider.

## Vercel Demo Frontend
1. `cd frontend/hotelier`
2. `vercel`
3. `vercel --prod`

Jika CLI belum ada:
- `npm i -g vercel`

## Security Notes
- Tidak ada hardcoded secret.
- Semua transaksi dibuat server-side.
- Webhook diverifikasi signature/token.
- Idempotency dengan event hash per referensi.
- Validasi amount sebelum update status paid.
- Log hanya data non-sensitif.

## Test Plan
- Cek signature invalid => 401.
- Callback duplikat => idempotent.
- Amount mismatch => ditolak.
- Status provider dipetakan ke status normalisasi.

## License
Lisensi QloApps asli tetap dipertahankan (OSL/AFL sesuai upstream).

## Vercel Git Deploy Guide`r`nLihat panduan lengkap di `docs/vercel-deploy.md` untuk setup root directory `frontend/hotelier` dan preview deployment berbasis GitHub.`r`n

## Final Visual Assets
- Asset root: rontend/hotelier/assets
- Brand:
  - ssets/brand/logo-anaira-black-transparent.png
  - ssets/brand/logo-anaira-white-transparent.png
  - ssets/brand/favicon.ico
  - ssets/brand/apple-touch-icon.png
  - ssets/brand/og-anaira-glamping.jpg
- Hero:
  - Desktop: ssets/images/hero/hero-pool-mountain-desktop.webp
  - Mobile: ssets/images/hero/hero-pool-mountain-mobile.webp
- Rooms:
  - Balcony: ssets/images/rooms/balcony/balcony-exterior-garden.webp
  - Porch: ssets/images/rooms/porch/porch-cabin-garden.webp
  - Villa: ssets/images/rooms/villa/villa-view-pool-area.webp
- Facilities:
  - ssets/images/facilities/pool-mountain-view.webp
  - ssets/images/facilities/garden-cabin-overview.webp
  - ssets/images/facilities/outdoor-table-umbrella.webp
- Gallery: ssets/images/gallery/gallery-*.webp, ssets/images/gallery/thumb-*.webp
- Video: ssets/video/anaira-glamping-video.mp4

## Local Preview Without npm Dependencies
`ash
cd frontend/hotelier
node scripts/static-server.js
`
PowerShell shortcut:
`powershell
.\scripts\start-local.ps1
`

## Vercel Preview
`ash
cd frontend/hotelier
npx.cmd vercel --yes
`

## Pending
- Google Maps exact pin/share URL masih menunggu konfirmasi final owner.
