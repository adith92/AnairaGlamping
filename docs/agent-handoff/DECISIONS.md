# 📌 Project Decisions

Record important decisions:

1. UI/UX:
Keep current Anaira premium/glassmorphism/tropical style.
Do not redesign from scratch.

2. Vercel:
Frontend deployment root is frontend/hotelier.
Repo root is not deploy target.

3. Backend:
QloApps/PHP root remains in repo but not for Vercel static frontend.
Shared hosting/VPS may later host backend/payment/database.

4. Payment:
Manual QRIS/Transfer verification UI is demo-ready.
Real Midtrans/Xendit need backend server keys and webhook.
No payment secret in frontend.

5. Data:
Current client demo uses LocalStorage fallback.
Production shared data requires database.

6. Agent workflow:
All cross-device progress must be synced through Git docs/agent-handoff folder.
Do not depend on local Antigravity transcript logs.
