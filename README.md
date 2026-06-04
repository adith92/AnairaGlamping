<p align="center">
  <img src="frontend/hotelier/assets/brand/logo-anaira-black-transparent.png" alt="Anaira Glamping & Resort" width="420">
</p>

<h1 align="center">🏕️ Anaira Glamping PMS & Booking Center</h1>

<p align="center">
  <strong>Sistem reservasi staycation, booking online, visual calendar scheduler, PMS dashboard, chatbot FAQ, add-ons upsell, proof-of-payment verification desk, dan ekspor laporan CSV.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Static_HTML-1b7f5a?style=flat-square" alt="Frontend">
  <img src="https://img.shields.io/badge/PMS-Interactive_Dashboard-f59e0b?style=flat-square" alt="PMS">
  <img src="https://img.shields.io/badge/Chatbot-Rule--Based_Local-blue?style=flat-square" alt="Chatbot">
  <img src="https://img.shields.io/badge/Deploy-Vercel_Ready-black?style=flat-square" alt="Deploy">
  <img src="https://img.shields.io/badge/Roadmap-v3.0_Big_Upgrade-146546?style=flat-square" alt="Roadmap">
</p>

---

## 🌐 Preview URLs

- **Production**: [https://anairaglamp.vercel.app](https://anairaglamp.vercel.app)
- **Booking**: [/booking](https://anairaglamp.vercel.app/booking)
- **Promo**: [/promo](https://anairaglamp.vercel.app/promo)
- **Admin PMS**: [/admin/pms](https://anairaglamp.vercel.app/admin/pms)
- **Login**: [/login](https://anairaglamp.vercel.app/login)

---

## 📚 Anaira v3.0 Big Upgrade Master Docs

These files are the current source of truth for the Anaira Big Upgrade roadmap:

1. [MASTERPLAN_ANAIRA_BIG_UPGRADE.md](docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md) — strategic product, architecture, database, security, and roadmap direction.
2. [MASTERPROMPT_ANAIRA_BIG_UPGRADE.md](docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md) — quick reference and safe implementation protocol for AI/dev agents.
3. [IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md](docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md) — phased build roadmap from Phase 0 to production release.

Current rule: **start with Phase 0 only** before UI redesign, backend migration, payment changes, or large booking logic edits.

---

## ✅ What Works Now

- Homepage
- Booking wizard
- Booking review modal
- Booking success invoice
- Pre-arrival guide
- Promo landing pages
- Voucher engine
- Packages
- Add-ons upsell
- Gallery slideshow
- Contact/maps
- FAQ chatbot offline
- Admin PMS
- Occupancy calendar
- Payment verification UI
- Audit logs
- CSV export
- WhatsApp templates
- Mobile polish
- SEO JSON-LD
- Vercel deployment

---

## ⚠️ Production Reality Check

| Area | Status | Notes |
|---|---|---|
| Client demo | ✅ Ready | Current website and PMS demo are usable for demonstration |
| Vercel deploy | ✅ Ready | Deploy root must be `frontend/hotelier` |
| LocalStorage data | 🟡 Demo only | Not production database truth |
| Production database | ⏳ Pending | Supabase / PHP MySQL / Laravel / Next.js backend must be selected later |
| Real admin auth | ⏳ Pending | Demo password is not production auth |
| Payment gateway | 🟡 Injection-ready | Real payment needs backend secret + webhook |
| Webhook verification | ⏳ Pending | Must be server-side only |
| No frontend secrets | Mandatory | Do not store payment keys, DB passwords, bot tokens, or private keys in frontend |

---

## 🔐 Admin Access

Demo access note: the Admin PMS login is disguised under **Manage Booking**.

| Field | Value |
|---|---|
| Portal Gate | Type `admin` in the Booking ID input on `/login.html` |
| Demo Password | `221221` |
| Local URL | `http://localhost:4173/login` |

Do not claim production auth until backend-based authentication exists.

---

## 💾 Data Mode

- **Demo/client preview uses LocalStorage fallback** for fast local demonstrations without needing a database.
- **Production must not rely on LocalStorage** for booking, payment, auth, or availability truth.
- `api.php` + MySQL/shared hosting or Supabase can be used later, but secrets must remain server-side.
- `api.config.php` is ignored by Git.
- `api.config.example.php` is a safe template.

---

## 💳 Payment Gateway Status

- Manual QRIS/transfer verification UI is available.
- Midtrans/Xendit/DOKU/Indopay are injection-ready concepts.
- Real payment requires backend secret config and webhook.
- Never store payment secrets in frontend.
- Proof upload is not the same as paid status. It must be reviewed by admin or confirmed by gateway webhook.

---

## 🚀 Deployment

```text
Vercel root must be frontend/hotelier.
Do not deploy repo root.
Do not deploy during Phase 0.
```

Vercel project: `anairaglamp`.

---

## 🧭 Current Roadmap

```text
PHASE 0 — Documentation & Agent Cleanup
PHASE 1 — Stabilization & QA
PHASE 2 — Production Backend Foundation
PHASE 3 — Payment Gateway & Invoice Engine
PHASE 4 — PMS Pro Operations
PHASE 5 — Marketing, Voucher & Revenue Analytics
PHASE 6 — Notifications & AI Concierge
PHASE 7 — PWA / Mobile Staff Workflow
PHASE 8 — Security Hardening, Backup & Production Release
```

Immediate focus: **Phase 0**, then Phase 1 QA. No UI redesign, deploy, or payment/booking logic rewrite before the audit baseline is clean.

---

##  Agent Handoff / Cross-Device Sync

This project is configured for transition between AI agents across devices.

All agent context, decisions, rules, and status are stored in `docs/agent-handoff/`.

When starting on a new device, agents must start by reading:

👉 [docs/agent-handoff/MAC_START_HERE.md](docs/agent-handoff/MAC_START_HERE.md)

Then read the three Anaira v3.0 master docs listed above.

---

## 📁 Project Structure

```text
AnairaGlamping/
├── frontend/hotelier/                 # Static frontend and Vercel root
│   ├── index.html                     # Homepage
│   ├── rooms.html                     # Room listings
│   ├── booking.html                   # Booking wizard
│   ├── booking-success.html           # Success invoice
│   ├── pre-arrival.html               # Guest guide
│   ├── gallery.html                   # Gallery
│   ├── packages.html                  # Packages
│   ├── contact.html                   # Contact page
│   ├── login.html                     # Manage Booking / admin gate
│   ├── admin/pms.html                 # PMS dashboard
│   ├── data/site-content.json
│   ├── data/faq.json
│   ├── scripts/static-server.js
│   ├── scripts/admin-server.js
│   ├── scripts/anaira-data-lib.js
│   ├── scripts/anaira-chatbot.js
│   ├── scripts/build-pages.js
│   ├── vercel.json
│   └── package.json
├── docs/
│   ├── MASTERPLAN_ANAIRA_BIG_UPGRADE.md
│   ├── MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
│   ├── IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
│   └── agent-handoff/
├── tasks/
├── CHANGELOG.md
├── AGENTS.md
└── README.md
```

---

## 🚀 Quick Start

### Local Frontend Preview

```bash
cd frontend/hotelier
npm install
npm run dev
# Open http://localhost:4173
```

### Admin Panel with API

```bash
cd frontend/hotelier
npm run admin
# Open http://localhost:4173/admin/pms
```

### Compile Static Pages

```bash
cd frontend/hotelier
npm run build:pages
```

---

## 🛏 Room & Rate Matrix

| Unit | Qty | Capacity | Weekday | Weekend | Facilities |
|---|---:|---:|---:|---:|---|
| 🏡 Balcony Suite | 6 | 4 orang | Rp 500.000 | Rp 700.000 | AC, Android TV, Amenities |
| 🛖 Porch Cabin | 6 | 4 orang | Rp 350.000 | Rp 420.000 | Kipas, Android TV, Amenities |
| 🏠 Presidential Villa | 1 | 20 orang | Rp 2.100.000 | Rp 3.000.000 | AC, Android TV, Kitchen, Karaoke Set |

---

## 📜 License

Custom branding, frontend Hotelier integration, PMS dashboard, booking wizard, and Anaira-specific features are developed for **Anaira Glamping & Resort**.

© 2026 Anaira Glamping & Resort. All Anaira-specific content and customizations are proprietary.

---

<p align="center">
  <strong>🏕️ Made with ❤️ for Anaira Glamping & Resort</strong><br>
  <em>Where nature meets luxury, near Curug Nangka, Bogor</em>
</p>
