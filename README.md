<p align="center">
  <img src="frontend/hotelier/assets/brand/logo-anaira-black-transparent.png" alt="Anaira Glamping & Resort" width="420">
</p>

<h1 align="center">🏕️ Anaira Glamping PMS & Booking Center</h1>

<p align="center">
  <strong>Sistem reservasi glamping, booking online, PMS dashboard, content editor, dan payment gateway scaffold untuk Anaira Glamping & Resort.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Static_HTML-1b7f5a?style=flat-square" alt="Frontend">
  <img src="https://img.shields.io/badge/PMS-LocalStorage_Demo-f59e0b?style=flat-square" alt="PMS">
  <img src="https://img.shields.io/badge/Backend-QloApps_PHP-blue?style=flat-square" alt="Backend">
  <img src="https://img.shields.io/badge/Deploy-Vercel_Ready-black?style=flat-square" alt="Deploy">
  <img src="https://img.shields.io/badge/License-OSL--3.0_/_AFL--3.0-lightgrey?style=flat-square" alt="License">
</p>

---

## 🌐 Preview URLs

| Environment | URL | Notes |
|---|---|---|
| 🚀 **Vercel Production** | [hotelier-adith92.vercel.app](https://hotelier-adith92.vercel.app) | Static frontend demo |
| 🖥️ **Local Frontend** | `http://localhost:4173` | Via Node static server |
| 🔐 **Admin PMS** | `http://localhost:4173/admin/pms` | Full PMS dashboard |
| ✏️ **Content Editor** | `http://localhost:4173/admin/` | Site content manager |

---

## ✨ Feature List

| Emoji | Feature | Description |
|---|---|---|
| 🛏️ | **Room/Villa Management** | 3 types: Balcony Suite (6), Porch Cabin (6), Presidential Villa (1) |
| 📅 | **4-Step Booking Wizard** | Interactive wizard with room selection, calendar, guest form, payment simulation |
| 🧾 | **PMS Dashboard** | Full CRUD booking management with glassmorphism UI, search, filter, and real-time stats |
| 📊 | **Statistics & Analytics** | Revenue tracking, occupancy rates per room type, active bookings count |
| 👥 | **Guest Management** | Create, edit, and delete guest records with contact info, email, and payment history |
| 💳 | **Payment Settings** | QRIS scan, Bank Transfer, Midtrans scaffold, Xendit scaffold, INDOPAY QRIS |
| 🖼️ | **Gallery & Content Editor** | Visual content manager with JSON-driven site content and image uploads |
| ⚙️ | **Comprehensive Settings** | Room pricing (weekday/weekend), policies, contact info, brand configuration |
| 🌍 | **Google Maps Integration** | Direct link to Anaira Glamping location on Jl. Raya Curug Nangka |
| 📲 | **WhatsApp CTA** | One-click WhatsApp reservation to 081399693499 |
| 🚀 | **Vercel Deploy Ready** | Configured with `vercel.json`, clean URLs, and SPA fallback routing |
| 🧩 | **QloApps/PHP Backend Roadmap** | Shared hosting backend with MySQL, payment modules, and admin panel |
| 🎨 | **Premium UI Design** | Glassmorphism, animated sparkle effects, Tailwind CSS, Lucide Icons, Plus Jakarta Sans |
| 📱 | **Mobile Responsive** | Fully responsive design across all pages and admin panel |
| 🔐 | **Admin Authentication** | Session-based login guard with redirect protection |
| 📄 | **Invoice Generation** | Digital invoice/receipt generation after successful booking |

---

## 🛏️ Room & Rate Matrix

| Unit | Qty | Capacity | Weekday | Weekend | Facilities |
|---|---:|---:|---:|---:|---|
| 🏡 **Balcony Suite** | 6 | 4 orang | Rp 500.000 | Rp 700.000 | AC, Android TV, Amenities |
| 🛖 **Porch Cabin** | 6 | 4 orang | Rp 350.000 | Rp 420.000 | Kipas, Android TV, Amenities |
| 🏠 **Presidential Villa** | 1 | 20 orang | Rp 2.100.000 | Rp 3.000.000 | AC, Android TV, Kitchen, Karaoke Set |

---

## 📁 Project Structure

```text
WebProject/
├── frontend/hotelier/                 # 🌐 Static frontend (Vercel root)
│   ├── index.html                     #   Homepage
│   ├── rooms.html                     #   Room listings
│   ├── booking.html                   #   4-step booking wizard (2200+ lines)
│   ├── gallery.html                   #   Photo gallery
│   ├── packages.html                  #   Add-on packages
│   ├── contact.html                   #   Contact & map
│   ├── login.html                     #   Admin login page
│   ├── admin/                         #   🔐 Admin panel
│   │   ├── pms.html                   #     PMS dashboard (1141 lines)
│   │   ├── index.html                 #     Content editor
│   │   ├── admin.js                   #     Admin logic
│   │   └── admin.css                  #     Admin styles
│   ├── assets/                        #   🖼️ Visual assets
│   │   ├── brand/                     #     Logo, favicon, OG image
│   │   ├── images/                    #     Hero, rooms, gallery, facilities
│   │   └── video/                     #     Promo video
│   ├── data/
│   │   └── site-content.json          #   📝 CMS content data
│   ├── scripts/                       #   🧰 Dev tools
│   │   ├── static-server.js           #     Local static file server
│   │   ├── admin-server.js            #     Admin API server
│   │   ├── build-pages.js             #     HTML page builder
│   │   └── start-local.ps1            #     PowerShell launcher
│   ├── vercel.json                    #   ☁️ Vercel deploy config
│   └── package.json                   #   📦 Node package config
├── modules/                           #   🧩 QloApps payment modules
│   ├── midtranspayment/               #     Midtrans scaffold
│   ├── xenditpayment/                 #     Xendit scaffold
│   └── anairamultipayment/            #     Unified payment architecture
├── data/
│   └── seed_anaira.sql                #   🗃️ Database seed data
├── docs/                              #   📚 Documentation
├── CHANGELOG_ANAIRA.md                #   🧾 Project changelog
├── AGENTS.md                          #   🤖 AI agent guidelines
└── LICENSE.md                         #   📜 OSL-3.0 / AFL-3.0
```

---

## 🚀 Quick Start

### Local Frontend Preview

```bash
cd frontend/hotelier
node scripts/static-server.js
# Open http://localhost:4173
```

### Admin Panel with API

```bash
cd frontend/hotelier
node scripts/admin-server.js
# Open http://localhost:4173/admin/pms
```

### PowerShell Launcher

```powershell
cd frontend\hotelier
.\scripts\start-local.ps1
```

> 💡 **Tip:** If port 4173 is busy, kill the process first:
> ```powershell
> netstat -ano | findstr :4173
> taskkill /PID <PID> /F
> ```

---

## 🔐 Admin Access

| Field | Value |
|---|---|
| 👤 Username | `admin` |
| 🔑 Password | `221221` |
| 🌐 URL | `http://localhost:4173/login.html` → redirects to `/admin/pms` |

> ⚠️ **Warning:** Demo credentials only. This is a `sessionStorage`-based login guard — **not production-grade authentication**. Do not use in production without implementing proper server-side auth.

---

## 💾 Data & Storage Status

### Current: LocalStorage Demo

All data is stored in the browser's `localStorage` for demo purposes:

| Key | Purpose |
|---|---|
| `anaira_bookings` | 📅 Booking records with guest info, room, dates, payment |
| `anaira_rooms` | 🛏️ Room inventory and availability |
| `anaira_guests` | 👥 Guest contact database |
| `anaira_pricing_settings` | 💰 Weekday/weekend pricing configuration |
| `anaira_payment_settings` | 💳 Payment method preferences |
| `anaira_payment_logs` | 📋 Payment transaction log |
| `anaira_blocked_dates` | 🚫 Blocked/unavailable dates |
| `anaira_settings` | ⚙️ General application settings |

### Static Content

| File | Purpose |
|---|---|
| `frontend/hotelier/data/site-content.json` | 📝 Brand, rooms, packages, facilities, gallery, contact |

### Future: Real Database

| Target | Technology |
|---|---|
| 🐬 Production DB | MySQL 5.7+ / MariaDB 10.5+ via QloApps |
| 🐘 Alternative | PostgreSQL (if custom backend) |
| 🔑 Auth | QloApps Back Office or custom JWT |

---

## 💳 Payment Gateway Status

| Gateway | Status | Notes |
|---|---|---|
| 📱 **Manual QRIS** | ✅ Ready | Scan QR code & upload payment proof |
| 🏦 **Bank Transfer** | ✅ Ready | Manual confirmation via admin |
| 💳 **Midtrans Snap** | 🟡 Scaffold | VA, CC, E-wallet — needs backend endpoint |
| 💸 **Xendit Invoice** | 🟡 Scaffold | OVO, ShopeePay, DANA — needs backend endpoint |
| 🔴 **INDOPAY QRIS** | 🟡 Scaffold | Dynamic QR — needs acquirer credentials |
| 🏧 **DOKU** | ⚠️ Planned | Awaiting official credentials & docs |
| 🔄 **Indopay Custom** | ⚠️ Planned | Awaiting official API documentation |
| 🌏 **UnionPay** | ❌ Via Provider | Provider/acquirer integration only |

### 🔐 Payment Security Notes

- ✅ No hardcoded API keys in source code
- ✅ Sandbox/production separation via config
- ✅ Webhook signature verification scaffold
- ✅ Idempotency via `last_event_hash`
- ✅ Amount mismatch rejection logic
- ✅ Payment logs never store full secrets

---

## ☁️ Deployment Guide

### Vercel (Static Frontend)

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set **Root Directory** to: `frontend/hotelier`
3. No build command needed (static site)
4. Deploy! 🚀

```text
Root Directory: frontend/hotelier
Build Command: (leave empty)
Output Directory: (leave empty / auto)
```

### Shared Hosting (PHP Backend)

1. Upload QloApps source to shared hosting
2. Create MySQL database
3. Import QloApps schema + `data/seed_anaira.sql`
4. Update `config/settings.inc.php` with DB credentials
5. Enable payment modules in QloApps Back Office
6. Set sandbox credentials for payment providers
7. Configure HTTPS and webhook callback URLs

### Hybrid Architecture (Recommended)

```text
┌─────────────────────┐     ┌──────────────────────┐
│   Vercel (Free)     │     │  Shared Hosting/VPS  │
│   Static Frontend   │────▶│  QloApps PHP Backend │
│   booking.html      │     │  MySQL Database      │
│   gallery.html      │     │  Payment Webhooks    │
│   admin/pms.html    │     │  Real Auth           │
└─────────────────────┘     └──────────────────────┘
```

---

## 📋 Current Readiness Status

| Feature | Status | Details |
|---|---|---|
| 📅 Booking Wizard | ✅ Ready | 4-step interactive wizard with calendar |
| 🧾 Admin PMS | ✅ Ready | Full CRUD with glassmorphism UI |
| 🛏️ Room Management | ✅ Ready | 3 room types with pricing |
| 👥 Guest Management | ✅ Ready | Create, edit, delete guests |
| 📊 Analytics Dashboard | ✅ Ready | Revenue, occupancy, active bookings |
| 🖼️ Content Editor | ✅ Ready | JSON-driven with image upload |
| 📅 Availability Calendar | ✅ Ready | Interactive date picker with range selection |
| 📲 WhatsApp CTA | ✅ Ready | Direct booking link |
| 🌍 Google Maps | ✅ Ready | Embedded location |
| 🎨 Responsive UI | ✅ Ready | Mobile + desktop optimized |
| 💳 Payment Settings | 🟡 Demo | LocalStorage-only, no real transactions |
| 🗃️ Real Database | ⚠️ Needs Backend | Currently localStorage demo |
| 🔐 Production Auth | ⚠️ Needs Backend | Currently sessionStorage guard |
| 💰 Payment Processing | ❌ Not Production | Scaffold only, no live payments |
| 📧 Email Notifications | ❌ Not Built | Needs backend SMTP integration |

---

## 🧾 Recent Changelog

### 🚀 2026-05-24 — AntiGravity AI Finishing Sprint

- ✨ Complete README rewrite with comprehensive documentation
- 🧾 Full functionality audit documentation
- 📋 Admin settings checklist
- 🗃️ Database migration roadmap
- ☁️ Deployment guide for Vercel & shared hosting
- 📊 AntiGravity finishing report

### 🏕️ 2026-05-23 — Documentation & Readiness Refresh

- ✨ Branded README with Anaira identity
- 📌 Progress tracking and deploy readiness status
- 🧪 Local preview instructions and troubleshooting
- 🌐 Vercel vs shared hosting deployment guide

### 💳 2026-05-22 — Frontend, Assets & Payment Architecture

- 🖼️ Logo, hero images, gallery, video integration
- 📍 Google Maps and WhatsApp CTA
- 🛏️ Room cards with Balcony, Porch, Villa data
- 💳 Midtrans, Xendit, and unified payment module scaffolds
- 🔐 Webhook verification and idempotency scaffolds
- 🧭 Local Node static server

> 📝 Full changelog: [CHANGELOG_ANAIRA.md](CHANGELOG_ANAIRA.md)

---

## 🖼️ Visual Assets

| Asset | Path | Status |
|---|---|---|
| 🖤 Logo (Black) | `frontend/hotelier/assets/brand/logo-anaira-black-transparent.png` | ✅ |
| 🤍 Logo (White) | `frontend/hotelier/assets/brand/logo-anaira-white-transparent.png` | ✅ |
| 🌐 OG Image | `frontend/hotelier/assets/brand/og-anaira-glamping.jpg` | ✅ |
| ⭐ Favicon | `frontend/hotelier/assets/brand/favicon.ico` | ✅ |
| 📱 Apple Touch | `frontend/hotelier/assets/brand/apple-touch-icon.png` | ✅ |
| 🖥️ Hero Desktop | `frontend/hotelier/assets/images/hero/hero-pool-mountain-desktop.webp` | ✅ |
| 📱 Hero Mobile | `frontend/hotelier/assets/images/hero/hero-pool-mountain-mobile.webp` | ✅ |
| 🏡 Room Images | `frontend/hotelier/assets/images/rooms/` | ✅ |
| 📷 Gallery | `frontend/hotelier/assets/images/gallery/` | ✅ |
| 🎥 Video | `frontend/hotelier/assets/video/anaira-glamping-video.mp4` | ✅ |

---

## 📍 Location & Contact

| Info | Value |
|---|---|
| 📍 Address | Jl. Raya Curug Nangka, Bogor |
| 🗺️ Google Maps | [maps.app.goo.gl/YVSmNtEsiK9tQNRS6](https://maps.app.goo.gl/YVSmNtEsiK9tQNRS6) |
| 📞 WhatsApp | [081399693499](https://wa.me/6281399693499) |
| ⏰ Check-in | 13:00 |
| ⏰ Check-out | 12:00 |
| ❌ Cancellation | DP non-refundable, reschedule available |

---

## 📌 Development Flow

```text
Branch: feature/anaira-glamping → develop → main

Workflow:
Code edit → Local preview → Push branch → Vercel preview → Visual review → Merge → Production deploy
```

---

## 📜 License

This project is a fork of [QloApps](https://github.com/Qloapps/QloApps). Original QloApps license terms are fully preserved:

- **Core:** [Open Software License v3.0 (OSL-3.0)](https://opensource.org/licenses/OSL-3.0)
- **Modules:** [Academic Free License v3.0 (AFL-3.0)](https://opensource.org/licenses/AFL-3.0)

Custom branding, frontend Hotelier integration, PMS dashboard, booking wizard, and Anaira-specific features are developed for **Anaira Glamping & Resort**.

© 2026 Anaira Glamping & Resort. All Anaira-specific content and customizations are proprietary.

---

<p align="center">
  <strong>🏕️ Made with ❤️ for Anaira Glamping & Resort</strong><br>
  <em>Where nature meets luxury, near Curug Nangka, Bogor</em>
</p>
