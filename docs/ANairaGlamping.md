# Anaira Glamping & Resort Architecture

## Ringkasan Arsitektur
- Backend: QloApps (PHP/PrestaShop core)
- Front-end landing: static pages di `frontend/hotelier`
- Payment module custom:
  - `modules/midtranspayment`
  - `modules/xenditpayment`
- Data seed: `data/seed_anaira.sql`

## Alur Booking dan Payment
1. User pilih kamar (Balcony/Porch/Villa) dan paket tambahan.
2. Order terbentuk di QloApps.
3. User memilih metode pembayaran:
   - Midtrans: Snap token dibuat, user membayar via modal/QRIS.
   - Xendit: Invoice dibuat, user diarahkan ke halaman invoice.
4. Callback gateway masuk ke controller `validation.php` masing-masing modul.
5. Signature/token diverifikasi sebelum update status order menjadi paid.

## Menambah Unit Baru
1. Tambah data produk + room type di database.
2. Tambah harga weekday/weekend di `ps_anaira_room_pricing`.
3. Jika perlu, update halaman statis front-end.

## Menambah Paket Baru
1. Insert ke tabel `ps_package`.
2. Pastikan modul booking memuat paket ke perhitungan total.

## Maintenance
- Update modul:
  1. Pull source terbaru.
  2. Jalankan regression test callback payment.
  3. Deploy bertahap (staging -> production).
- SSL:
  1. Pantau masa aktif sertifikat.
  2. Perpanjang sebelum jatuh tempo.
  3. Validasi ulang callback URL HTTPS di Midtrans/Xendit.
- Monitoring:
  1. Cek log callback gagal.
  2. Rekonsiliasi transaksi paid harian.
