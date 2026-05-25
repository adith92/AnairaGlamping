# 🧭 Next Steps

Immediate next steps for tomorrow:
1. Open production on Mac/phone:
   https://anairaglamp.vercel.app
2. Test homepage, booking, promo, login, admin PMS.
3. Do a 10-minute client demo flow.
4. Collect visual/UX feedback only.
5. Do not add major features before client review.

Next major phases:
A. Payment Gateway Injection
- Midtrans
- Xendit
- Manual QRIS
- DOKU/Indopay later
- Webhook backend required

B. Production Database
- Option 1: Shared Hosting + MySQL + api.php
- Option 2: Supabase
- Option 3: Hybrid Vercel frontend + backend API

C. Custom Domain
- Connect real domain later.
- Keep Vercel project root as frontend/hotelier.

D. Security
- Replace demo auth with backend auth before production.
- Do not store secrets in frontend.
- Keep api.config.php ignored.

Do NOT do yet:
- Do not redesign UI.
- Do not add random new features.
- Do not change Vercel root.
- Do not deploy repo root.
