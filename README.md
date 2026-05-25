<p align="center">
  <img src="frontend/hotelier/assets/brand/logo-anaira-black-transparent.png" alt="Anaira Glamping & Resort" width="420">
</p>

<h1 align="center">🏕️ Anaira Glamping PMS & Booking Center</h1>

<p align="center">
  <strong>Sistem reservasi glamping, booking online, PMS dashboard, manajemen voucher & paket staycation, galeri slideshow, dan payment gateway scaffold untuk Anaira Glamping & Resort.</strong>
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
| 🚀 **Vercel Production** | [hotelier-adith92.vercel.app](https://hotelier-adith92.vercel.app) | Deployed production-ready application |
| 🖥️ **Local Frontend** | `http://localhost:4173` | Via local static preview server |
| 🔐 **Admin PMS** | `http://localhost:4173/admin/pms` | Full PMS dashboard (Vouchers, Packages, Settings) |
| 🛡️ **Manage Booking Door** | `http://localhost:4173/login` | Disguised gateway login for Guests & Admins |

---

## ✨ Feature List

| Emoji | Feature | Description |
|---|---|---|
| 🛏️ | **Room/Villa Management** | 3 types: Balcony Suite (6), Porch Cabin (6), Presidential Villa (1) |
| 📅 | **4-Step Booking Wizard** | Wizard with room selection, scheduling, guest details (Indonesia WhatsApp validated) |
| 🎟️ | **Staycation Packages** | Curated packages (Lebaran Family Escape, Romantic Honeymoon, Weekend BBQ) |
| 💸 | **Voucher Code Engine** | Asynchronous redemption checks against usage limits, dates, and room limits |
| 🧾 | **PMS Dashboard** | Premium CRUD booking dashboard with occupancy stats, calendar, guests list |
| 🎟️ | **PMS Voucher CRUD** | Create and track vouchers from IG, Threads, Influencer, Partner, and Manual |
| 📦 | **PMS Packages CRUD** | Visual stay promo packages manager with title, price, inclusions, terms |
| 🗺️ | **Direct Map Load** | lazy-loaded responsive maps widget in contacts page with Google Maps link fallback |
| 🖼️ | **Stunning Lightbox** | SwipeableFullscreen gallery modal with scale animations and Play/Pause slideshow |
| 📲 | **WhatsApp Cleanup** | Visual WA spam cleanup; official WhatsApp calls limited strictly to Contact page |
| 🎨 | **Premium Visuals** | Glassmorphism grids, starry sparkle effects, Tailwind CSS, Plus Jakarta Sans |

---

## 🛏️ Room & Rate Matrix

| Unit | Qty | Capacity | Weekday | Weekend | Facilities |
|---|---:|---:|---:|---:|---|
| 🏡 **Balcony Suite** | 6 | 4 orang | Rp 500.000 | Rp 700.000 | AC, Android TV, Amenities |
| 🛖 **Porch Cabin** | 6 | 4 orang | Rp 350.000 | Rp 420.000 | Kipas, Android TV, Amenities |
| 🏠 **Presidential Villa** | 1 | 20 orang | Rp 2.100.000 | Rp 3.000.000 | AC, Android TV, Kitchen, Karaoke Set |

---

## 🎟️ Staycation Promo Packages

Tersedia pilihan paket staycation hemat pegunungan yang sudah mencakup sewa kamar, santap sarapan, party BBQ outdoor, dekorasi room, dan api unggun:
*   **Paket Lebaran Family Escape 📅** (Rp 3.500.000 nett) - Menginap 2 malam di Villa mewah + BBQ set + Hampers spesial.
*   **Paket Honeymoon Romantic Stay 💖** (Rp 2.500.000 nett) - Stay 2 malam di Balcony Suite + romantic candle-light dinner + floating breakfast.
*   **Paket Weekend BBQ Glamping 🪵** (Rp 1.800.000 nett) - Stay 1 malam di Porch Cabin akhir pekan + outdoor grill BBQ set lengkap.

---

## 📁 Project Structure

```text
WebProject/
├── frontend/hotelier/                 # 🌐 Static frontend (Vercel root)
│   ├── index.html                     #   Homepage (Featured deals, trust section)
│   ├── rooms.html                     #   Room listings
│   ├── booking.html                   #   4-step booking wizard with package params
│   ├── gallery.html                   #   Photo gallery with lightbox slideshow
│   ├── packages.html                  #   Staycation packages catalog
│   ├── contact.html                   #   Contact page with lazy maps embed
│   ├── login.html                     #   Manage Booking disguised login portal
│   ├── admin/                         #   🔐 Admin panel
│   │   └── pms.html                   #     PMS dashboard (Packages & Vouchers CRUD)
│   ├── assets/                        #   🖼️ Visual assets (brand, images, video)
│   ├── data/
│   │   └── site-content.json          #   📝 Dynamic CMS data source
│   ├── scripts/                       #   🧰 Dev and rebuilder tools
│   │   ├── static-server.js           #     Local static file server
│   │   ├── admin-server.js            #     Admin API server
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

---

## 🔐 Admin Access

| Field | Value |
|---|---|
| 👤 Portal Gate | Ketikkan kata `admin` di kolom input Booking ID di `/login.html` |
| 🔑 Password | `221221` (kolom input kata sandi rahasia muncul otomatis) |
| 🌐 URL | `http://localhost:4173/login` |

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

## 🎟️ PMS Voucher Code Setup

Dari dasbor PMS menu **"Vouchers"**, pengelola dapat:
1.  Mengklik **Gen** untuk mengenerate kode promo teratur secara otomatis (contoh: `INFJ4B57`, `THR72V90`, dll.).
2.  Memilih **Promo Source** (IG, Threads, Influencer, Partner, Manual, Website).
3.  Mengisi nama influencer jika source yang dipilih adalah `Promo Influencer` (field ini wajib diisi).
4.  Menentukan diskon persen/fixed, kuota batas limit, minimal transaksi, dan masa berlaku.
5.  Melihat `usedCount` secara live dari pemesanan yang sukses menempelkan voucher.

---

## 📜 License

Custom branding, frontend Hotelier integration, PMS dashboard, booking wizard, and Anaira-specific features are developed for **Anaira Glamping & Resort**.

© 2026 Anaira Glamping & Resort. All Anaira-specific content and customizations are proprietary.

---

<p align="center">
  <strong>🏕️ Made with ❤️ for Anaira Glamping & Resort</strong><br>
  <em>Where nature meets luxury, near Curug Nangka, Bogor</em>
</p>
