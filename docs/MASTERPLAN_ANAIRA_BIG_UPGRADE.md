# 📘 MASTERPLAN ANAIRA BIG UPGRADE
## Anaira Glamping & Resort — Booking Website, PMS, Guest Experience & Revenue Platform

> **Version:** Anaira v3.0 Big Upgrade Planning  
> **Status:** Strategic masterplan for major feature expansion  
> **Current repo:** `adith92/AnairaGlamping`  
> **Active branch:** `develop`  
> **Frontend root:** `frontend/hotelier`  
> **Current production:** `https://anairaglamp.vercel.app`  
> **Updated:** June 2026

> ⚠️ This document is planning-grade. It separates what already exists from what still must be built. Do not treat all v3.0 items as complete.

---

# Executive Summary

Anaira Glamping is currently more than a static marketing site. The current repo already has a public guest website, booking wizard, booking success invoice, pre-arrival guide, promo pages, voucher engine, packages, gallery, contact/maps, offline FAQ chatbot, Admin PMS, occupancy calendar, payment verification UI, audit logs, CSV export, WhatsApp templates, mobile polish, SEO JSON-LD, and Vercel deployment.

The next major upgrade should reposition the product as **Anaira Booking OS**: a full-stack hospitality platform for direct booking, PMS operations, payment verification and gateway automation, guest CRM, marketing analytics, notifications, AI concierge, and mobile-first staff workflows.

The current repo is suitable as a **prototype/demo foundation**. The v3.0 Big Upgrade must convert it into a **production-ready booking and PMS system** through controlled phases.

---

# A. Current Repo Audit

| Area | Current Status | Notes |
|---|---|---|
| Public Website | ✅ Exists | Homepage, rooms, gallery, packages, contact, promo pages |
| Booking Wizard | ✅ Exists | Guest booking flow with review and success invoice |
| Admin PMS | ✅ Exists | Dashboard, bookings, rooms, calendar, guests, payments, packages, gallery, vouchers, audit log, settings |
| Chatbot | ✅ Exists | Offline rule-based FAQ widget |
| Voucher Engine | ✅ Exists | Promo voucher model with source/influencer fields |
| Payment UI | ✅ Exists | Manual QRIS/transfer verification UI; gateway injection-ready |
| Data Mode | 🟡 Demo-first | LocalStorage fallback; live database planned |
| Production Backend | ❌ Not complete | Real auth, database schema, webhook, role security pending |
| Deployment | ✅ Vercel-ready | Must deploy `frontend/hotelier`, never repo root |
| Documentation | 🟡 Improving | Master docs and handoff docs required |
| Agent Guidance | ⚠️ Phase 0 item | `AGENTS.md` must match Anaira, not QloApps |

---

# B. Current Architecture

```text
AnairaGlamping/
├── frontend/hotelier/                 # Main deployable frontend root
│   ├── index.html                     # Homepage
│   ├── rooms.html                     # Room listings
│   ├── booking.html                   # Booking + payment wizard
│   ├── booking-success.html           # Success invoice / receipt
│   ├── pre-arrival.html               # Guest guide
│   ├── gallery.html                   # Gallery
│   ├── packages.html                  # Packages
│   ├── contact.html                   # Contact + maps
│   ├── login.html                     # Manage Booking / admin gate
│   ├── promo/                         # Promo landing pages
│   ├── rooms/                         # Room detail pages
│   ├── admin/pms.html                 # PMS dashboard
│   ├── assets/
│   ├── data/site-content.json
│   ├── data/faq.json
│   ├── scripts/anaira-data-lib.js
│   ├── scripts/anaira-chatbot.js
│   ├── scripts/admin-server.js
│   ├── scripts/static-server.js
│   ├── scripts/build-pages.js
│   ├── api.php                        # Shared hosting API bridge concept
│   ├── api.config.example.php
│   ├── vercel.json
│   └── package.json
├── docs/
│   └── agent-handoff/
├── tasks/
├── AGENTS.md
└── README.md
```

---

# C. Technical Stack

| Layer | Current Stack | Upgrade Direction |
|---|---|---|
| Public frontend | Static HTML + Tailwind CDN + vanilla JS | Stabilize first; optional migration later |
| Admin PMS | Single HTML app + JS + LocalStorage | Modularize step by step |
| Data demo | LocalStorage / `AnairaDB` concept | Production database with typed schema |
| Backend bridge | PHP PDO key-value/API concept | Secure relational backend or Supabase |
| Deployment | Vercel root `frontend/hotelier` | Keep frontend root; add backend separately |
| Payment | Manual QRIS/transfer UI | Midtrans/Xendit via backend webhook |
| Notification | WhatsApp templates | Telegram/WhatsApp/email automation |
| Testing | Playwright dependency | Add E2E public, booking, admin tests |

---

# D. Product Vision

Anaira should become a direct booking + PMS + guest experience platform:

```text
Guest discovers website
→ checks availability
→ books room/package
→ pays deposit / uploads proof
→ admin verifies or webhook confirms
→ calendar inventory is blocked
→ guest receives pre-arrival guide
→ staff manages check-in, stay, add-ons, balance, checkout
→ owner sees revenue, occupancy, promo performance, and guest database
```

Strategic goals:

1. Increase direct bookings.
2. Make admin work easier.
3. Make payment safer.
4. Prepare for scale with real backend, RBAC, audit logs, backup/export.
5. Keep Anaira brand premium: forest, cream, emerald, gold, nature luxury.

---

# E. Version Evolution

| Version | Status | Meaning |
|---|---|---|
| v1.0 | ✅ Done | Static marketing foundation |
| v1.5 | ✅ Done | Room/gallery/package/contact pages |
| v2.0 | ✅ Current | Booking wizard, PMS demo, voucher, payment UI, chatbot |
| v2.1 | ⏳ Next | Stabilization, documentation, AGENTS cleanup, test suite |
| v2.5 | ⏳ Planned | Production backend, database schema, secure auth |
| v3.0 | ⏳ Big Upgrade | Full PMS + gateway + analytics + notifications |
| v3.5 | ⏳ Future | Staff mobile/PWA, AI concierge, automation |
| v4.0 | ⏳ Future | OTA/channel manager, multi-property, advanced revenue |

---

# F. Target Modules

## Public Website
- Homepage
- Rooms & Rates
- Room detail pages
- Packages
- Promo landing pages
- Gallery
- Contact / Maps
- FAQ
- Booking
- Booking success invoice
- Pre-arrival guide
- Manage booking

## Booking Engine
- Date selection
- Room type/unit availability
- Package selection
- Guest count and extra guest pricing
- Add-ons
- Voucher validation
- Price breakdown
- DP calculation
- Invoice generation
- Manual payment upload
- Gateway payment link
- Booking status lifecycle

## PMS Admin Dashboard
- Dashboard
- Bookings
- Calendar
- Rooms/Villas
- Guests
- Payments
- Packages
- Promo/Vouchers
- Gallery CMS
- Add-ons
- Housekeeping
- Maintenance
- Audit Log
- Settings
- Reports

## Payment System
Real payment must be server-side. Required backend responsibilities:
- Create payment invoice/intent.
- Store payment reference.
- Receive webhook.
- Verify gateway signature.
- Update payment and booking status.
- Store gateway event logs.
- Handle expiry/refund/cancel.

## Guest CRM
- Guest profile.
- Booking history.
- Phone/email/WhatsApp.
- Preferences and notes.
- Repeat guest badge.
- Segmentation.

## Promo, Voucher & Influencer Analytics
- Voucher code tracking.
- Influencer/source/UTM tracking.
- Booking count.
- Gross revenue.
- Discount cost.
- Net revenue.
- Conversion rate.

## Operations
- Unit-level calendar.
- Housekeeping board.
- Maintenance tickets.
- Room readiness.
- Maintenance cost tracking.

## Owner Dashboard
- Occupancy rate.
- ADR.
- RevPAR.
- Paid/pending revenue.
- Booking source.
- Voucher performance.
- Calendar heatmap.

## Notifications
- WhatsApp templates.
- Telegram bot notifications.
- Email later.

## AI Concierge
- Rule-based fallback.
- Knowledge base from FAQ, rooms, packages.
- AI provider server-side only.
- WhatsApp handoff.
- Lead capture.

---

# G. Target Database Schema

Minimum production tables:

```text
users
rooms
room_units
guests
bookings
payments
packages
vouchers
blocked_dates
audit_logs
settings
notification_logs
campaign_events
```

Operations tables:

```text
housekeeping_tasks
maintenance_tickets
daily_revenue_snapshots
```

Production truth must be database-backed. LocalStorage is demo mode only.

---

# H. RBAC Matrix

| Module | Owner/GM | Admin | Front Desk | Finance | Housekeeping | Marketing |
|---|---:|---:|---:|---:|---:|---:|
| Dashboard | ✅ | ✅ | ✅ Limited | ✅ Finance | ✅ Task view | ✅ Marketing |
| Booking CRUD | ✅ | ✅ | ✅ | View only | ❌ | View source only |
| Calendar | ✅ | ✅ | ✅ | ❌ | ✅ Readiness | ❌ |
| Room Management | ✅ | ✅ | ✅ Limited | ❌ | ✅ Status only | ❌ |
| Payment Verification | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Packages | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Vouchers | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Guest CRM | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ Limited |
| Reports | ✅ | ✅ | ❌ | ✅ Finance | ❌ | ✅ Campaign |
| Settings | ✅ | ✅ Limited | ❌ | ❌ | ❌ | ❌ |
| Audit Logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

---

# I. UI/UX Direction

Theme: **Premium Nature Retreat**.

Visual direction:
- Deep forest green.
- Cream background.
- Emerald/mint highlights.
- Warm gold accents.
- Clean luxury, not generic SaaS.
- Smooth but purposeful animation.

Avoid:
- Random redesign.
- Generic SaaS purple gradient.
- Overloaded sparkle/animation.
- Unreadable glass panels.

Use motion carefully and respect `prefers-reduced-motion`.

---

# J. Security Principles

1. Never store payment secret keys in frontend.
2. Never trust LocalStorage for production booking truth.
3. Admin auth must be backend-based before real operations.
4. All booking/payment changes must create audit logs.
5. Webhook signature verification is mandatory.
6. CORS must be restricted in production.
7. Uploaded proof images must be validated for type and size.
8. API config files must stay ignored by Git.
9. Role access must be enforced server-side.
10. Use backups before schema or critical changes.

---

# K. Deployment Strategy

```text
Vercel root = frontend/hotelier
Never deploy repo root.
```

Recommended paths:

- **Option A — Supabase:** fastest for auth, PostgreSQL, storage, realtime.
- **Option B — PHP + MySQL:** friendly for cPanel/shared hosting.
- **Option C — Next.js/Laravel/Railway:** stronger long-term app, more setup.

Do not rewrite everything first. Stabilize current frontend, then add backend behind existing flows.

---

# L. Roadmap

| Phase | Name | Goal | Status |
|---|---|---|---|
| 0 | Documentation & Cleanup | Master docs, AGENTS rewrite, repo truth | Current |
| 1 | Stabilization | QA, Playwright, mobile, content, deployment safety | Next |
| 2 | Backend Foundation | Real auth, database schema, storage, API | Planned |
| 3 | Payment Production | Midtrans/Xendit/manual QRIS webhook | Planned |
| 4 | PMS Pro | Operations, housekeeping, maintenance, reports | Planned |
| 5 | Marketing Growth | Promo, voucher, influencer ROI, SEO | Planned |
| 6 | Notifications | Telegram/WhatsApp/email automation | Planned |
| 7 | AI Concierge | Smart FAQ, lead capture, executive summary | Planned |
| 8 | Mobile/PWA | Staff and owner mobile workflow | Future |

---

# M. Immutable Rules

```text
RULE 1 — FRONTEND ROOT
Always work from frontend/hotelier for site preview/deploy.

RULE 2 — NO FRONTEND SECRETS
Never place payment secret keys, database passwords, or admin secrets in HTML/JS.

RULE 3 — DEMO VS PRODUCTION
LocalStorage is demo mode only. Production truth must be database-backed.

RULE 4 — BOOKING STATUS MACHINE
Booking changes must follow validated statuses.

RULE 5 — PAYMENT STATUS MACHINE
Payment status must be changed by webhook or authorized admin review only.

RULE 6 — AUDIT EVERY MUTATION
Booking, payment, voucher, room, price, and settings changes must be logged.

RULE 7 — MOBILE-FIRST
Guest booking must work perfectly on phone.

RULE 8 — NO DOUBLE BOOKING
Availability must be checked server-side before confirmation.

RULE 9 — SAFE DEPLOYMENT
Never deploy repo root. Never break current public URLs.

RULE 10 — DOCUMENT EVERYTHING
Every major feature must update master docs, README, and AGENTS.md.
```

---

**End of MASTERPLAN ANAIRA BIG UPGRADE**
