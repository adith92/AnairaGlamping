# 🧾 Anaira Glamping Changelog

Changelog ini khusus untuk pengembangan **Anaira Glamping & Resort** di atas fork QloApps.

---

## 🚀 2026-05-23 — Documentation & Readiness Refresh

### Added

- ✨ README baru dengan branding Anaira Glamping & Resort.
- 📌 Keterangan progress project dan status deploy readiness.
- 🧪 Instruksi local preview untuk memperbaiki kasus `localhost refused to connect`.
- 🌐 Penjelasan Vercel frontend demo vs shared hosting backend.
- 🧾 Changelog khusus project Anaira.
- 🖼️ Dokumentasi asset logo, hero, gallery, dan video.

### Changed

- 📝 README tidak lagi tampil seperti QloApps bawaan.
- 🏕️ Narasi project difokuskan ke glamping/resort.
- 💳 Payment gateway dijelaskan dengan status realistis.
- ✅ Deploy readiness dipisahkan antara preview dan production.

### Fixed

- 🧹 README lama punya karakter rusak seperti `\u0007ssets`, `\rontend`, dan literal `` `r`n ``.
- 🔧 Localhost error dijelaskan: server local harus dijalankan dulu dengan Node static server.

---

## 🏕️ 2026-05-22 — Anaira Frontend & Asset Integration

### Added

- 🖼️ Logo Anaira Glamping & Resort.
- 🌄 Hero image untuk homepage.
- 📷 Gallery image set.
- 🎥 Video Anaira Glamping.
- 📍 Google Maps final link.
- 📞 WhatsApp booking CTA.
- 🧭 Static local server berbasis Node.

### Changed

- 🧱 Frontend Hotelier disesuaikan untuk Anaira.
- 🏡 Room cards memakai data Balcony, Porch, dan Villa.
- 🎁 Packages page menampilkan breakfast, BBQ, honeymoon, dan family.
- 📍 Contact page diarahkan ke Google Maps final.

### Known Limitations

- ⚠️ Foto Villa masih perlu tambahan agar card Villa lebih akurat.
- ⚠️ PHP lint belum dijalankan karena runtime PHP belum tersedia.

---

## 💳 2026-05-22 — Indonesia Payment Architecture

### Added

- 💳 `modules/midtranspayment`
- 💳 `modules/xenditpayment`
- 🧩 `modules/anairamultipayment`
- 🧾 `ps_anaira_payment_log` schema baseline.
- 🔐 Webhook verification scaffold.
- 🔁 Idempotency via event hash.
- 🧪 Payment callback smoke test file.

### Provider Status

| Provider | Status |
|---|---|
| Manual QRIS | ✅ Supported |
| WhatsApp | ✅ Supported |
| Midtrans | 🟡 Scaffold |
| Xendit | 🟡 Scaffold |
| DOKU | 🟡 Stub/plan |
| Indopay | 🟡 Stub |
| UnionPay | 🟡 Via acquirer/provider |

### Security Notes

- 🔐 Tidak ada hardcoded secret.
- 🔐 Sandbox/production via config.
- 🔐 Webhook harus diverifikasi.
- 🔐 Amount mismatch harus ditolak.
- 🔐 Payment log tidak boleh menyimpan secret.

---

## 🛏️ 2026-05-22 — Anaira Business Data

### Added

- 🏡 Balcony: 6 kamar, max 4 orang.
- 🛖 Porch: 6 kamar, max 4 orang.
- 🏠 Villa: 1 rumah, max 20 orang.
- 🍳 Breakfast package.
- 🔥 BBQ package.
- 💐 Honeymoon package.
- 👨‍👩‍👧 Family package.
- ⏰ Check-in 13.00.
- ⏰ Check-out 12.00.
- 📌 Policy: DP hangus, bisa reschedule.

---

## ✅ Current Readiness

### Ready

- ✅ Frontend static preview.
- ✅ Vercel demo flow.
- ✅ Visual assets.
- ✅ WhatsApp booking.
- ✅ Google Maps link.
- ✅ README and docs.

### Pending

- ⚠️ PHP 8.1+ local install.
- ⚠️ Composer validation.
- ⚠️ Payment sandbox test.
- ⚠️ Webhook end-to-end test.
- ⚠️ Shared hosting backend test.
- ⚠️ Admin panel smoke test.

---

## 🧭 Next Milestone

1. Jalankan local frontend dengan Node static server.
2. Review visual di browser lokal.
3. Install PHP 8.1+ dan Composer.
4. Jalankan PHP lint untuk custom modules.
5. Test backend di shared hosting/VPS.
6. Test Midtrans/Xendit sandbox.
7. Deploy Vercel production setelah visual final.
