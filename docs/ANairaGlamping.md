# Anaira Glamping Technical Architecture

## 1) Arsitektur Sistem
- Backend: QloApps (fork PrestaShop)
- Frontend: Static Hotelier di `frontend/hotelier`
- Integrasi Payment:
  - `midtranspayment`
  - `xenditpayment`
  - `anairamultipayment` (shared architecture)

## 2) Frontend Static Hotelier
- Halaman: `index`, `rooms`, `gallery`, `packages`, `contact`
- CTA WhatsApp: `https://wa.me/6281399693499?text=...`
- Vercel ready via `frontend/hotelier/vercel.json`

## 3) Payment Architecture
- Provider adapters via `modules/anairamultipayment/classes/adapters`
- Provider siap/live: Midtrans, Xendit
- Provider planned/stub: DOKU, Indopay/custom acquirer
- Manual QRIS flow tersedia
- UnionPay sebagai capability via provider/acquirer yang mendukung

## 4) Security Model
- Secret disimpan di Configuration admin, bukan hardcoded.
- Webhook verification:
  - Midtrans: signature SHA512
  - Xendit: `x-callback-token`
- Idempotency:
  - `last_event_hash` pada `ps_anaira_payment_log`
- Amount validation sebelum status update
- Safe customer message + detailed internal log

## 5) Admin Config Fields
- enable_midtrans, midtrans_environment, midtrans_server_key, midtrans_client_key
- enable_xendit, xendit_environment, xendit_secret_key, xendit_callback_token
- enable_doku, doku_environment, doku_client_id, doku_secret_key, doku_shared_key
- enable_indopay, indopay_environment, indopay_merchant_id, indopay_api_key
- enable_manual_qris, qris_image_path, qris_instruction_text
- enable_unionpay, unionpay_provider, unionpay_notes
- whatsapp_number

## 6) Deploy
### Frontend Demo (Vercel)
- `cd frontend/hotelier`
- `vercel`
- `vercel --prod`

### Backend Production (Shared Hosting)
- Upload backend source
- Import DB + `data/seed_anaira.sql`
- Configure `app/config/parameters.php`
- Set callback URL provider ke domain production HTTPS

## 7) Manual QA Checklist
- Payment option tampil sesuai enable/disable config
- Midtrans/Xendit create transaction success/fail handling
- Invalid webhook signature/token ditolak
- Duplicate webhook idempotent
- Amount mismatch ditolak
- WhatsApp fallback selalu tersedia
- Static pages mobile-friendly dan CTA valid
