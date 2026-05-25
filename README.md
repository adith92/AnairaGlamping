<p align="center">
  <img src="frontend/hotelier/assets/brand/logo-anaira-black-transparent.png" alt="Anaira Glamping & Resort" width="420">
</p>

<h1 align="center">🏕️ Anaira Glamping PMS & Booking Center</h1>

<p align="center">
  <strong>Sistem reservasi staycation, booking online, visual calendar scheduler, PMS dashboard, chatbot FAQ cerdas, add-ons upsell, proof-of-payment verification desk, dan ekspor laporan CSV akurat.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Static_HTML-1b7f5a?style=flat-square" alt="Frontend">
  <img src="https://img.shields.io/badge/PMS-Interactive_Dashboard-f59e0b?style=flat-square" alt="PMS">
  <img src="https://img.shields.io/badge/Chatbot-Rule--Based_Local-blue?style=flat-square" alt="Chatbot">
  <img src="https://img.shields.io/badge/Deploy-Vercel_Ready-black?style=flat-square" alt="Deploy">
  <img src="https://img.shields.io/badge/License-OSL--3.0_/_AFL--3.0-lightgrey?style=flat-square" alt="License">
</p>

---

## 🌐 Preview URLs

| Environment | URL | Notes |
|---|---|---|
| 🚀 **Vercel Production** | [hotelier-adith92.vercel.app](https://hotelier-adith92.vercel.app) | Deployed production-ready application |
| 🖥️ **Local Frontend** | `http://localhost:4173` | Via local static preview server |
| 🔐 **Admin PMS** | `http://localhost:4173/admin/pms` | Full PMS dashboard (Calendar, Bookings, Vouchers, Settings) |
| 🛡️ **Manage Booking Door** | `http://localhost:4173/login` | Disguised gateway login for Guests & Admins |

---

## ✨ Feature List

| Emoji | Feature | Description |
|---|---|---|
| 🛏️ | **Room/Villa Management** | 3 types: Balcony Suite (6), Porch Cabin (6), Presidential Villa (1) |
| 📅 | **Interactive Calendar** | Real-time date availability, quantity constraints, weekend prices, maintenance blocking |
| 🎟 | **Promo Staycation Pages** | Dynamic stays pages (Lebaran Family, Honeymoon Romantic, Weekend BBQ, Family Adventure) |
| 💸 | **Voucher Engine** | Asynchronous redemption validations with influencer metrics and conversion logs |
| 🧾 | **PMS Admin Panel** | Premium CRUD booking dashboard, daily occupancy rates, visual monthly blocking grids |
| 💳 | **Verification Desk** | Proof-of-payment approval desk (Approve, Reject, Refund) with full lightbox preview |
| 📊 | **BOM CSV Exports** | UTF-8 BOM Excel-friendly direct CSV reports downloads for bookings, revenue, and guests |
| 💬 | **FAQ Chatbot Concierge** | Offline-first, Rule-based keyword matching chatbot widget with zero API costs |
| 📲 | **WhatsApp Sanitized** | Clean WhatsApp visual spam; calls limited strictly to Contact and successful Invoices |
| 🎨 | **Premium Visuals** | Glassmorphism panels, starry sparkle effects, Tailwind CSS, Plus Jakarta Sans |

---

## 🛏 Room & Rate Matrix

| Unit | Qty | Capacity | Weekday | Weekend | Facilities |
|---|---:|---:|---:|---:|---|
| 🏡 **Balcony Suite** | 6 | 4 orang | Rp 500.000 | Rp 700.000 | AC, Android TV, Amenities |
| 🛖 **Porch Cabin** | 6 | 4 orang | Rp 350.000 | Rp 420.000 | Kipas, Android TV, Amenities |
| 🏠 **Presidential Villa** | 1 | 20 orang | Rp 2.100.000 | Rp 3.000.000 | AC, Android TV, Kitchen, Karaoke Set |

---

## 🎟 Staycation Promo Packages

Pilihan paket staycation sejuk pegunungan Bogor curasi khusus untuk keluarga, pasangan, dan petualangan:
*   **Paket Lebaran Family Escape 📅** (Rp 3.500.000 nett) - Menginap 2 malam di Villa mewah + BBQ set + Hampers spesial.
*   **Paket Honeymoon Romantic Stay 💖** (Rp 2.500.000 nett) - Stay 2 malam di Balcony Suite + candlelight dinner + floating breakfast.
*   **Paket Weekend BBQ Glamping 🪵** (Rp 1.800.000 nett) - Stay 1 malam di Porch Cabin akhir pekan + outdoor grill BBQ set lengkap.
*   **Paket Family Adventure Glamping 🎒** (Rp 2.200.000 nett) - Stay 1 malam di Balcony/Porch + fun outdoor activity + smores kit + souvenirs.

---

## 📁 Project Structure

```text
WebProject/
├── frontend/hotelier/                 # 🌐 Static frontend (Vercel root)
│   ├── index.html                     #   Homepage (Featured deals, trust section)
│   ├── rooms.html                     #   Room listings
│   ├── booking.html                   #   4-step booking wizard with package params & addons
│   ├── booking-success.html           #   Success receipt invoice with print styles
│   ├── pre-arrival.html               #   Pre-arrival guide & guest guidelines handbook
│   ├── gallery.html                   #   Photo gallery with lightbox slideshow
│   ├── packages.html                  #   Staycation packages catalog
│   ├── contact.html                   #   Contact page with lazy maps embed
│   ├── login.html                     #   Manage Booking disguised login portal
│   ├── admin/                         #   🔐 Admin panel
│   │   └── pms.html                   #     PMS dashboard (Calendar & Vouchers Approval Desk)
│   ├── assets/                        #   🖼️ Visual assets (brand, images, video)
│   ├── data/
│   │   ├── site-content.json          #   📝 Dynamic CMS data source
│   │   └── faq.json                   #   💬 Localized FAQ database
│   ├── scripts/                       #   🧰 Dev and rebuilder tools
│   │   ├── static-server.js           #     Local static file server
│   │   ├── admin-server.js            #     Admin API server
│   │   ├── anaira-chatbot.js          #     FAQ Chatbot widget logic script
│   │   └── build-pages.js             #     Static pages compiler script
│   ├── vercel.json                    #   ☁️ Vercel rewrite rules
│   └── package.json                   #   📦 Node package config
├── docs/                              #   📚 Documentation files
├── tasks/                             #   📋 Implementation task logs
├── CHANGELOG.md                       #   CHANGELOG
└── AGENTS.md                          #   Robot instructions
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

### Compile Static Pages

```bash
node frontend/hotelier/scripts/build-pages.js
```

---

## 🔐 Admin Access

| Field | Value |
|---|---|
| 👤 Portal Gate | Ketikkan kata `admin` di kolom input Booking ID di `/login.html` |
| 🔑 Password | `221221` (kolom input kata sandi rahasia muncul otomatis) |
| 🌐 URL | `http://localhost:4173/login` |

---

## 💬 Anaira FAQ Chatbot widget
Widget asisten obrolan dipasang di seluruh halaman publik.
- **Biaya Nol Rupiah:** Menggunakan rule-based engine di `anaira-chatbot.js` yang memetakan masukan kata kunci dari `data/faq.json` seketika secara luring/offline, bebas biaya token API.
- **AI Concierge Stub:** Tersedia konfigurasi `anaira_ai_settings` di script chatbot (default nonaktif: `enabled: false`) untuk sambungan kecerdasan buatan (LLM) di masa depan.

---

## 💾 Dual-Mode Database Engine

Sistem dilengkapi dengan **Dual-Mode Database** yang diabstraksikan melalui modul `AnairaDB` di `anaira-data-lib.js`. Pengelola dapat mengubah mode secara langsung di **PMS Dashboard → Settings**:

### 1. Demo Mode (LocalStorage Fallback)
Semua data transaksi dan pengaturan disimpan di dalam `localStorage` browser. Memungkinkan pengujian fungsionalitas penuh tanpa memerlukan penyiapan server basis data:
*   `anaira_bookings`: 📅 Data reservasi tamu lengkap.
*   `anaira_vouchers`: 🎟️ Daftar kode voucher promo diskon.
*   `anaira_rooms` & `anaira_guests`: 🛏️ Status inventaris kamar dan basis data tamu.
*   `anaira_settings`: ⚙️ Pengaturan umum & switch database.

### 2. Live Mode (SQL Database)
Sistem terhubung langsung ke basis data relasional SQL secara real-time:
*   **Supabase (PostgreSQL):** Komunikasi langsung berbasis REST API dari client-side ke database Supabase yang super cepat.
*   **Shared Hosting (MySQL/PDO):** Terkoneksi menggunakan skrip jembatan ultra-aman `api.php` yang menyimpan kredensial sensitif di sisi server cPanel menggunakan `getenv()`.

---

## 📜 License

Custom branding, frontend Hotelier integration, PMS dashboard, booking wizard, and Anaira-specific features are developed for **Anaira Glamping & Resort**.

© 2026 Anaira Glamping & Resort. All Anaira-specific content and customizations are proprietary.

---

<p align="center">
  <strong>🏕️ Made with ❤️ for Anaira Glamping & Resort</strong><br>
  <em>Where nature meets luxury, near Curug Nangka, Bogor</em>
</p>
