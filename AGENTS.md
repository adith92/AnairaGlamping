# AGENTS.md
## Anaira Glamping & Resort — AI Agent Guide

> **Repo:** `adith92/AnairaGlamping`  
> **Active branch:** `develop`  
> **Main frontend root:** `frontend/hotelier`  
> **Deployment rule:** Vercel root must be `frontend/hotelier`, never repo root.

---

# 1. Project Overview

This repository is the Anaira Glamping & Resort booking website and PMS demo foundation.

The current app is a static Hotelier-style frontend with:

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

The repo is being upgraded toward **Anaira Booking OS v3.0**: a production-ready booking, PMS, guest CRM, payment, notification, analytics, and staff workflow platform.

---

# 2. Source of Truth

Agents must read these before making major changes:

```text
README.md
docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md
docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
docs/agent-handoff/MAC_START_HERE.md
docs/agent-handoff/PROJECT_STATUS.md
docs/agent-handoff/NEXT_STEPS.md
frontend/hotelier/package.json
frontend/hotelier/vercel.json
frontend/hotelier/scripts/anaira-data-lib.js
frontend/hotelier/booking.html
frontend/hotelier/admin/pms.html
```

If any of the master docs are missing, Phase 0 is not complete.

---

# 3. Actual Stack

```text
Frontend:
- Static HTML
- Tailwind CDN
- Vanilla JavaScript
- LocalStorage demo data engine

Admin PMS:
- frontend/hotelier/admin/pms.html
- Shared data via frontend/hotelier/scripts/anaira-data-lib.js

Developer scripts:
- node scripts/static-server.js
- node scripts/admin-server.js
- node scripts/build-pages.js

Deployment:
- Vercel static deploy from frontend/hotelier

Optional backend bridge:
- frontend/hotelier/api.php
- frontend/hotelier/api.config.example.php
- api.config.php must remain ignored and must not be committed
```

This is **not** a QloApps/Smarty module workflow for Anaira frontend work. Do not follow PHP/Smarty/QloApps module rules unless the task explicitly targets legacy QloApps files.

---

# 4. Local Commands

From repo root:

```bash
cd frontend/hotelier
npm install
npm run dev
```

Admin server:

```bash
cd frontend/hotelier
npm run admin
# open /admin/pms
```

Build static pages:

```bash
cd frontend/hotelier
npm run build:pages
```

---

# 5. Deployment Rules

```text
DO:
- Use frontend/hotelier as Vercel root.
- Keep clean URLs and rewrites in frontend/hotelier/vercel.json.
- Preserve existing public routes.

DO NOT:
- Deploy repo root.
- Move deploy root without explicit approval.
- Change Vercel settings during Phase 0.
- Deploy before documentation and QA checklist are complete.
```

Critical current routes:

```text
/
/rooms
/rooms/balcony
/rooms/porch
/rooms/villa
/gallery
/packages
/contact
/booking
/booking-success
/pre-arrival
/login
/admin/pms
/promo
/promo/lebaran
/promo/honeymoon
/promo/bbq
/promo/family
```

---

# 6. Security Rules

Agents must never commit or expose:

```text
payment secret keys
database passwords
admin secrets
API private keys
webhook signing secrets
bot tokens
api.config.php
.env files with real secrets
```

Production rules:

- LocalStorage is demo mode only.
- Production bookings must be database-backed.
- Production admin auth must be backend-based.
- Payment status must be changed only by verified webhook or authorized admin review.
- Availability must be checked server-side before confirming real bookings.
- Uploaded proof images must be validated by file type and size server-side.
- Admin mutations must create audit logs.

---

# 7. Booking and Payment Safety

Do not make large booking/payment logic changes before audit and tests.

Booking status must follow a clear state machine:

```text
draft → pending_payment → payment_review → confirmed → checked_in → checked_out → completed
```

Alternative states:

```text
expired
payment_rejected
cancelled
rescheduled
```

Payment status must follow safe transitions:

```text
unpaid → pending → manual_uploaded → manual_approved → paid
pending → paid via verified webhook
pending → failed/expired
paid → refund_requested → refund_pending → refunded
```

Do not treat proof upload as paid. Proof upload means payment review is required.

---

# 8. Preferred Agent Workflow

Before editing:

1. Confirm branch: `develop`.
2. Confirm frontend root: `frontend/hotelier`.
3. Read nearby files and current patterns.
4. Check whether the task belongs to current phase.
5. Avoid unrelated UI redesign or random features.
6. Identify safety impact: route, booking, payment, auth, storage, deployment.

During editing:

1. Keep changes small and phase-scoped.
2. Preserve existing routes and IDs/classes where possible.
3. Do not delete files unless explicitly instructed.
4. Do not move payment/DB secrets into frontend.
5. Update docs after major changes.

After editing:

1. Run or define relevant manual checks.
2. Verify no frontend secrets were introduced.
3. Verify Vercel root remains `frontend/hotelier`.
4. Report files changed, tests, security impact, deployment impact, and backup status.

---

# 9. Backup Rule

For local risky edits, create a timestamped backup before editing critical files, then delete the backup after validation passes.

Examples:

```text
.backups/20260604-anaira/AGENTS.md.bak
.backups/20260604-anaira/README.md.bak
```

Retain backups only if:

- validation fails,
- rollback is needed,
- the user explicitly asks to preserve them.

When editing via GitHub connector/API, the previous file blob and commit history act as rollback history. Do not add permanent backup copies to the repo unless specifically requested.

---

# 10. Documentation Update Rule

Major feature work must update relevant docs:

```text
README.md
docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md
docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
docs/agent-handoff/PROJECT_STATUS.md
docs/agent-handoff/NEXT_STEPS.md
AGENTS.md
```

Phase 0 specifically requires:

```text
[ ] Three master docs exist in docs/
[ ] README links to master docs
[ ] AGENTS.md is Anaira-specific
[ ] PROJECT_STATUS mentions v3.0 Big Upgrade
[ ] NEXT_STEPS clearly points to Phase 1 QA after Phase 0
```

---

# 11. Manual Test Checklist

Public website:

```text
[ ] Homepage loads
[ ] Rooms page loads
[ ] Room detail pages load
[ ] Gallery loads
[ ] Packages loads
[ ] Contact/map loads
[ ] Promo pages load
[ ] Mobile nav works
[ ] CTA goes to booking
[ ] Chatbot opens and answers FAQ
```

Booking:

```text
[ ] Select check-in/check-out
[ ] Select room
[ ] Apply voucher
[ ] Add add-ons
[ ] Price calculation correct
[ ] Review modal opens
[ ] Booking success page shows invoice
[ ] Booking stored correctly in demo mode
[ ] WhatsApp template correct
```

Admin PMS:

```text
[ ] Login gate works
[ ] Dashboard stats render
[ ] Booking list appears
[ ] Calendar renders
[ ] Payment verification UI opens
[ ] Voucher/package/gallery/settings sections open
[ ] Audit log records mutation
[ ] CSV export works
```

Production safety:

```text
[ ] No frontend secrets
[ ] LocalStorage clearly marked as demo mode
[ ] Payment webhook remains pending until backend exists
[ ] Real auth remains pending until backend exists
[ ] Vercel root remains frontend/hotelier
```

---

# 12. Agent Final Report Format

Every implementation must finish with:

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
- deploy needed?
- root directory
- rollback notes

BACKUPS:
- backup created?
- backup deleted or retained?
- reason
```

---

**End of AGENTS.md**
