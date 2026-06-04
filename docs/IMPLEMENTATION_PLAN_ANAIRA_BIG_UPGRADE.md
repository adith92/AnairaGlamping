# 📕 IMPLEMENTATION PLAN ANAIRA BIG UPGRADE
## Anaira Glamping & Resort — Major Upgrade Build Roadmap

> **Version:** Anaira v3.0 Big Upgrade Implementation Plan  
> **Status:** Planned roadmap for large-scale improvement  
> **Repo:** `adith92/AnairaGlamping`  
> **Branch:** `develop`  
> **Frontend root:** `frontend/hotelier`  
> **Updated:** June 2026

This roadmap separates the current demo-ready system from the production-grade work that still needs to be built. Do not jump into a full rewrite. Do not redesign UI or change booking/payment logic before Phase 0 and Phase 1 audit are complete.

---

# Current Repo Baseline

Current app already includes:

- public website,
- booking wizard,
- booking success invoice,
- pre-arrival guide,
- promo pages,
- voucher engine,
- packages,
- gallery,
- contact/maps,
- offline FAQ chatbot,
- Admin PMS,
- occupancy calendar,
- payment verification UI,
- audit logs,
- CSV export,
- WhatsApp templates,
- mobile polish,
- SEO JSON-LD,
- Vercel deployment.

Still pending for production:

- production database,
- real backend auth,
- server-side availability validation,
- payment gateway secret handling,
- webhook verification,
- backend storage for proof-of-payment,
- role-based access control,
- production backup/restore.

---

# Phase Order

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

---

# PHASE 0 — Documentation & Agent Cleanup

## P0.1 — Create Anaira Master Documentation

Files:

```text
NEW docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md
NEW docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
NEW docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
MOD README.md
MOD docs/agent-handoff/PROJECT_STATUS.md
MOD docs/agent-handoff/NEXT_STEPS.md
```

Tasks:

1. Add three master docs.
2. Update README with links to the master docs.
3. Mark current project as demo-ready and Vercel-ready.
4. Mark production DB, real auth, and payment webhook as pending.
5. Add v3.0 roadmap summary.

Acceptance:

```text
[ ] All docs exist in docs/
[ ] README links to docs
[ ] Agent handoff docs mention v3.0 Big Upgrade
[ ] No contradiction between README and docs
```

## P0.2 — Rewrite AGENTS.md for Anaira

Files:

```text
MOD AGENTS.md
```

Tasks:

1. Remove QloApps/PHP/Smarty guidance.
2. Add actual Anaira stack:
   - static HTML,
   - Tailwind CDN,
   - vanilla JS,
   - Node scripts,
   - LocalStorage demo data engine,
   - Vercel frontend root,
   - optional PHP MySQL API bridge.
3. Add safety rules:
   - never deploy repo root,
   - no frontend secrets,
   - backup critical files before risky local edits,
   - update docs after major changes.
4. Add preferred workflow:
   - inspect nearby files,
   - preserve routes,
   - test local server,
   - run booking/admin flow.

Acceptance:

```text
[ ] AGENTS.md no longer references QloApps as project overview
[ ] AGENTS.md points to frontend/hotelier
[ ] AGENTS.md includes deployment and security rules
[ ] New agent can understand project in under 5 minutes
```

---

# PHASE 1 — Stabilization & QA

## P1.1 — Public Website Smoke Test

Add Playwright smoke tests for homepage, rooms, room detail pages, gallery, packages, promo pages, contact, booking, and login.

Acceptance:

```text
[ ] Public page smoke tests pass
[ ] Clean URLs work on Vercel config
[ ] No 404 for existing routes
[ ] No HTML download regression
```

## P1.2 — Booking Flow QA

Test date selection, room selection, voucher, add-ons, review modal, success invoice, price calculation, availability count, and mobile viewport.

Acceptance:

```text
[ ] Booking can be completed in demo mode
[ ] Invoice contains correct booking code
[ ] Price calculation correct
[ ] Voucher validation correct
[ ] Mobile booking flow usable
```

## P1.3 — Admin PMS QA

Test login gate, dashboard metrics, booking list, calendar, payments, packages, vouchers, gallery, settings, and audit log after mutation.

Acceptance:

```text
[ ] Admin gate works
[ ] Dashboard renders
[ ] Section navigation works
[ ] Data persists in demo mode
[ ] Audit log captures admin action
```

## P1.4 — UI/UX & Motion Polish

Only after tests: normalize design tokens, improve mobile spacing, reduce animation overload, add `prefers-reduced-motion`, improve focus states.

---

# PHASE 2 — Production Backend Foundation

Pick one backend track before production logic:

```text
Option A: Supabase — fastest for auth, database, storage, realtime.
Option B: PHP + MySQL — good for shared hosting/cPanel.
Option C: Laravel/Railway — stronger backend, more setup.
Option D: Next.js full stack — good if migrating later.
```

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

Seed:

```text
Balcony: 6 units
Porch: 6 units
Villa: 1 unit
Default packages
Default vouchers
```

Acceptance:

```text
[ ] Backend option selected
[ ] Env strategy documented
[ ] Schema approved
[ ] Rooms/packages/vouchers seeded
[ ] Real auth and roles planned
[ ] Demo mode separated from production mode
```

---

# PHASE 3 — Payment Gateway & Invoice Engine

Manual payment production flow:

```text
[ ] Proof upload stored securely
[ ] File type and size validated
[ ] Admin approve/reject with reason
[ ] Booking/payment status updates correctly
[ ] Audit log records action
```

Gateway flow:

```text
[ ] Backend create-intent endpoint exists
[ ] Midtrans/Xendit payment link created
[ ] Webhook signature verified
[ ] Payment event stored
[ ] Booking confirmed only after paid webhook/admin approval
[ ] No payment secret in frontend
```

Invoice/PDF:

```text
[ ] Unique invoice number
[ ] Printable invoice
[ ] Downloadable receipt/PDF
[ ] Price breakdown correct
[ ] WhatsApp confirmation text generated
```

---

# PHASE 4 — PMS Pro Operations

Build only after backend foundation is clear:

- unit-level calendar,
- housekeeping board,
- maintenance tickets,
- guest CRM.

Acceptance highlights:

```text
[ ] Unit-level overlap validation server-side
[ ] Maintenance blocks availability
[ ] Checkout can create cleaning task
[ ] Guest profile links to booking history
```

---

# PHASE 5 — Marketing, Voucher & Revenue Analytics

Build:

- voucher source/influencer ROI,
- UTM campaign tracking,
- revenue dashboard,
- SEO landing pages.

Metrics:

```text
total revenue
paid revenue
pending revenue
occupancy rate
ADR
RevPAR
booking source
top package
top room type
payment aging
cancellation rate
```

---

# PHASE 6 — Notifications & AI Concierge

Build:

- Telegram bot notifications,
- WhatsApp template center,
- AI concierge upgrade.

Strict rule: bot token and AI provider keys must stay server-side only.

---

# PHASE 7 — PWA / Mobile Staff Workflow

Build:

- manifest,
- service worker,
- icons,
- offline fallback,
- mobile staff pages.

Staff pages:

```text
/staff/today
/staff/checkin
/staff/checkout
/staff/housekeeping
/staff/maintenance
```

---

# PHASE 8 — Security, Backup & Production Release

Security hardening:

```text
[ ] No frontend secrets
[ ] API rejects unauthorized requests
[ ] Upload validation works
[ ] Payment webhook verified
[ ] Audit log protected
[ ] CORS restricted
[ ] Rate limiting planned/enabled
```

Backup/export:

```text
[ ] Daily database backup
[ ] Manual backup/export button
[ ] Export bookings/guests/payments/revenue
[ ] Restore procedure documented and tested
```

Production release:

```text
[ ] README updated
[ ] AGENTS.md updated
[ ] Master docs updated
[ ] Env variables set
[ ] Database migration complete
[ ] Payment sandbox tested
[ ] Webhook tested
[ ] Admin auth tested
[ ] Backup tested
[ ] E2E tests pass
[ ] Deploy frontend from frontend/hotelier only
```

---

# First Sprint File Summary

```text
NEW docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md
NEW docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
NEW docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
MOD AGENTS.md
MOD README.md
MOD docs/agent-handoff/PROJECT_STATUS.md
MOD docs/agent-handoff/NEXT_STEPS.md
```

Phase 1 later:

```text
NEW tests/e2e/public-site.spec.js
NEW tests/e2e/booking-flow.spec.js
NEW tests/e2e/admin-pms.spec.js
MOD frontend/hotelier/package.json
```

---

# Required Agent Final Report Format

```text
SUMMARY:
- What changed

FILES CHANGED:
- list files

TESTS:
- command run
- result

SECURITY:
- secrets check
- auth/rbac impact
- payment impact

DEPLOYMENT:
- whether deploy needed
- root directory
- rollback notes

BACKUPS:
- backup created?
- backup deleted or retained?
- reason
```

---

**End of IMPLEMENTATION PLAN ANAIRA BIG UPGRADE**
