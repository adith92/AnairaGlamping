# 📗 MASTERPROMPT ANAIRA BIG UPGRADE
## Quick Reference for AI Developers — Anaira Glamping Booking Website & PMS

> **Version:** Anaira v3.0 Big Upgrade Prompt  
> **Purpose:** Give Antigravity, OpenClaw, Cursor, Codex, Claude Code, or other agents one safe source of truth.  
> **Current frontend root:** `frontend/hotelier`  
> **Active branch:** `develop`  
> **Updated:** June 2026

---

# Quick Start

```bash
git clone https://github.com/adith92/AnairaGlamping.git
cd AnairaGlamping
git checkout develop
cd frontend/hotelier
npm install
npm run dev
```

Admin preview:

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

Deployment rule:

```text
Vercel project root must be frontend/hotelier.
Never deploy repo root.
```

---

# 1. Agent Startup Protocol

Before implementing, read these files first:

```text
README.md
AGENTS.md
docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md
docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
docs/agent-handoff/MAC_START_HERE.md
docs/agent-handoff/PROJECT_STATUS.md
docs/agent-handoff/NEXT_STEPS.md
frontend/hotelier/package.json
frontend/hotelier/vercel.json
frontend/hotelier/scripts/anaira-data-lib.js
frontend/hotelier/admin/pms.html
frontend/hotelier/booking.html
```

Confirm:

```text
- Branch is develop.
- Frontend root is frontend/hotelier.
- No deploy is needed for Phase 0.
- No UI redesign is needed before audit and QA.
```

---

# 2. Immutable Rules

```text
RULE 1 — FRONTEND ROOT ONLY
Work and deploy from frontend/hotelier unless explicitly instructed otherwise.

RULE 2 — DO NOT BREAK LIVE DEMO
Existing URLs must continue working: /, /booking, /promo, /admin/pms, /login.

RULE 3 — DO NOT DEPLOY REPO ROOT
Repo root may contain non-deployable legacy files. Vercel root must remain frontend/hotelier.

RULE 4 — LOCALSTORAGE IS DEMO MODE
LocalStorage is useful for demo, but not production truth.

RULE 5 — PRODUCTION REQUIRES BACKEND
Real auth, real payments, room availability, and booking confirmation require server-side validation.

RULE 6 — NEVER STORE SECRETS IN FRONTEND
No payment secret keys, DB password, admin secret, or private API keys in HTML/JS.

RULE 7 — BOOKING STATUS MUST BE VALIDATED
Do not update booking.status randomly. Use the booking state machine.

RULE 8 — PAYMENT STATUS MUST BE VALIDATED
Payment status changes must come from admin approval or verified gateway webhook.

RULE 9 — NO DOUBLE BOOKING
Before confirming booking, check overlapping date ranges by room/unit on backend.

RULE 10 — AUDIT EVERY ADMIN MUTATION
Bookings, payments, rooms, prices, vouchers, packages, and settings changes must create audit logs.

RULE 11 — MOBILE-FIRST GUEST FLOW
Booking must work well on mobile. Guest conversion matters more than desktop polish.

RULE 12 — UI MUST KEEP ANAIRA BRAND
Premium forest, cream, emerald, gold, nature-luxury direction. Avoid generic SaaS look.

RULE 13 — ACCESSIBILITY MATTERS
Visible focus states, readable contrast, reduced motion support, proper labels.

RULE 14 — DOCUMENT EVERY MAJOR CHANGE
Update README, master docs, and handoff docs after major features.

RULE 15 — BACKUP BEFORE RISKY CHANGE
Before editing critical files locally, create a timestamped backup. Delete backup after validation passes.
```

---

# 3. Current System Map

Existing public pages:

```text
index.html
rooms.html
rooms/balcony.html
rooms/porch.html
rooms/villa.html
booking.html
booking-success.html
pre-arrival.html
gallery.html
packages.html
contact.html
login.html
promo.html
promo/lebaran.html
promo/honeymoon.html
promo/bbq.html
promo/family.html
```

Existing admin sections inside `frontend/hotelier/admin/pms.html`:

```text
dashboard
bookings
rooms / villas
calendar
guests
payments
packages
gallery
vouchers
audit log
settings
```

Existing shared data concept from `anaira-data-lib.js`:

```text
BOOKINGS
ROOMS
GUESTS
PRICING
PAYMENT
PAYMENT_LOGS
BLOCKED_DATES
SETTINGS
VOUCHERS
DB_CONFIG
PACKAGES
DEALS
```

---

# 4. Target Architecture

```text
Frontend:
  Static HTML + Tailwind CDN + vanilla JS today.
  Keep stable first; migrate only after QA and planning.

Backend:
  Supabase / PHP MySQL API / Laravel / Next.js API.
  Backend must own auth, payment, availability, booking, storage, webhooks.

Database:
  PostgreSQL or MySQL relational schema.
  LocalStorage is demo fallback only.

Storage:
  proof-of-payment images, gallery uploads, invoice PDFs, backup files.

Notifications:
  Telegram bot, WhatsApp template links, email later.

AI:
  FAQ concierge, room/package recommendation, admin executive summary.
```

---

# 5. Status Machines

Booking transitions:

```js
const BOOKING_TRANSITIONS = {
  draft: ['pending_payment'],
  pending_payment: ['payment_review', 'expired', 'cancelled'],
  payment_review: ['confirmed', 'payment_rejected', 'cancelled'],
  payment_rejected: ['pending_payment', 'cancelled'],
  confirmed: ['checked_in', 'cancelled', 'rescheduled'],
  rescheduled: ['confirmed', 'cancelled'],
  checked_in: ['checked_out'],
  checked_out: ['completed'],
  completed: [],
  expired: [],
  cancelled: []
};
```

Payment transitions:

```js
const PAYMENT_TRANSITIONS = {
  unpaid: ['pending'],
  pending: ['manual_uploaded', 'paid', 'failed', 'expired'],
  manual_uploaded: ['manual_approved', 'manual_rejected'],
  manual_approved: ['paid'],
  manual_rejected: ['pending'],
  paid: ['refund_requested'],
  refund_requested: ['refund_pending', 'refund_rejected'],
  refund_pending: ['refunded'],
  failed: ['pending'],
  expired: ['pending'],
  refunded: []
};
```

Housekeeping transitions:

```js
const HOUSEKEEPING_TRANSITIONS = {
  clean: ['dirty', 'out_of_order'],
  dirty: ['cleaning'],
  cleaning: ['inspection'],
  inspection: ['ready', 'cleaning'],
  ready: ['dirty', 'out_of_order'],
  out_of_order: ['maintenance']
};
```

---

# 6. Core Code Patterns

## Safe LocalStorage Wrapper

```js
function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[Anaira] Failed to parse ${key}`, error);
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    console.error(`[Anaira] Failed to save ${key}`, error);
    return { ok: false, error: error.message };
  }
}
```

## Data Adapter Interface

```js
const AnairaStore = {
  async get(collection) {},
  async set(collection, data) {},
  async insert(collection, item) {},
  async update(collection, id, patch) {},
  async remove(collection, id) {},
  async audit(action, entityType, entityId, before, after) {}
};
```

Implementations:

```text
LocalStorageAdapter
SupabaseAdapter
PhpMysqlAdapter
FutureLaravelAdapter
```

## Availability Check

```js
function isDateOverlap(newCheckIn, newCheckOut, existingCheckIn, existingCheckOut) {
  const a1 = new Date(newCheckIn).getTime();
  const a2 = new Date(newCheckOut).getTime();
  const b1 = new Date(existingCheckIn).getTime();
  const b2 = new Date(existingCheckOut).getTime();
  return a1 < b2 && b1 < a2;
}
```

Production version must run server-side.

## Payment Gateway Creation

```js
async function createPaymentIntent(booking) {
  const res = await fetch('/api/payments/create-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      bookingId: booking.id,
      amount: booking.depositAmount,
      provider: 'midtrans'
    })
  });

  if (!res.ok) throw new Error('Failed to create payment intent');
  return await res.json();
}
```

Server-side endpoint must hold the secret. Never expose the gateway secret in frontend.

---

# 7. Database Schema Target

Minimum first production tables:

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
```

Use `MASTERPLAN_ANAIRA_BIG_UPGRADE.md` as the schema reference.

---

# 8. UI/UX Prompt for Agents

```text
You are the Senior UI/UX + Hospitality PMS Engineer for Anaira Glamping.

Keep the Anaira visual identity:
- Premium nature retreat
- Deep forest green
- Cream background
- Emerald/mint highlights
- Warm gold accents
- Clean luxury, not generic SaaS
- Smooth but purposeful animation

Before implementing:
1. Read README.md and docs/agent-handoff.
2. Confirm frontend root is frontend/hotelier.
3. Identify current pattern in nearby files.
4. Do not rewrite large files unnecessarily.
5. Preserve current public URLs and Vercel route behavior.
6. Avoid frontend secrets.
7. Add audit logs for admin mutations.
8. Update documentation after changes.

For any new feature, output:
- files changed
- feature summary
- data structure
- validation rules
- security notes
- mobile behavior
- manual test checklist
```

---

# 9. Big Upgrade Master Prompt

```text
PROJECT: Anaira Glamping Booking OS v3.0 Big Upgrade

GOAL:
Upgrade the current AnairaGlamping website from static/demo PMS into a production-ready booking, PMS, guest CRM, payment, notification, and analytics platform.

CURRENT REPO FACTS:
- Repo: adith92/AnairaGlamping
- Active branch: develop
- Frontend root: frontend/hotelier
- Deployment: Vercel must use frontend/hotelier as root
- Current app: static HTML + Tailwind CDN + vanilla JS + LocalStorage demo mode
- Admin: frontend/hotelier/admin/pms.html
- Shared data lib: frontend/hotelier/scripts/anaira-data-lib.js
- PHP bridge: frontend/hotelier/api.php
- Current payment: manual QRIS/transfer verification UI, gateway injection-ready
- Production backend: pending

PHASE ORDER:
0. Documentation and agent cleanup
1. Stabilization and QA
2. Production backend and database
3. Payment gateway integration
4. PMS Pro modules
5. Marketing and revenue analytics
6. Notifications and AI concierge
7. PWA/mobile staff workflow
8. Security hardening and deployment

STRICT RULES:
- Never deploy repo root.
- Never store secrets in frontend.
- Never break current live URLs.
- Never assume LocalStorage is production-safe.
- Never confirm booking without server-side availability.
- Never update payment status without authorized review or verified webhook.
- Always update docs after major changes.
```

---

# 10. Testing Checklist

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
[ ] Booking stored correctly
[ ] Availability prevents overbooking in demo mode
[ ] WhatsApp template correct
```

Admin PMS:

```text
[ ] Login gate works
[ ] Dashboard stats correct
[ ] Booking list appears
[ ] Calendar status correct
[ ] Payment verification works
[ ] Voucher CRUD works
[ ] Package CRUD works
[ ] Gallery upload works in local admin server
[ ] Audit log records mutation
[ ] Settings saved
[ ] Backup/export works
```

Production safety:

```text
[ ] No secrets in frontend
[ ] API CORS restricted
[ ] Admin auth backend-based
[ ] Payment webhook verified
[ ] Upload size/type validated
[ ] Database backup available
[ ] Vercel root correct
[ ] Smoke test passed after deploy
```

---

# 11. Common Gotchas

```text
GOTCHA 1:
Running Vercel from repo root can cause wrong deployment behavior. Always use frontend/hotelier.

GOTCHA 2:
LocalStorage data can disappear per browser/device. Do not treat it as production database.

GOTCHA 3:
Payment gateway client keys are not the same as server keys. Server keys must never be exposed.

GOTCHA 4:
Manual QRIS proof upload is not payment confirmation. Admin must approve, or webhook must confirm.

GOTCHA 5:
A single room type can have multiple units. Availability must count overlapping bookings against quantity.

GOTCHA 6:
Admin PMS is currently a large HTML app. Avoid messy patching. Prefer modular JS extraction step by step.

GOTCHA 7:
AGENTS.md must match this repo. If it references QloApps or unrelated architecture, rewrite it.

GOTCHA 8:
Do not add random design styles. Keep Anaira brand direction consistent.

GOTCHA 9:
Do not trust query params for price/package without validation against stored package data.

GOTCHA 10:
After major content changes, run build-pages.js and check generated pages.
```

---

# 12. Final Delivery Checklist

```text
[ ] README updated
[ ] AGENTS.md corrected for Anaira
[ ] MASTERPLAN updated
[ ] MASTERPROMPT updated
[ ] IMPLEMENTATION_PLAN updated
[ ] docs/agent-handoff updated
[ ] Local preview tested
[ ] Admin preview tested
[ ] Booking flow tested
[ ] Mobile tested
[ ] Vercel root verified
[ ] No secrets committed
[ ] Git diff reviewed
```

---

**End of MASTERPROMPT ANAIRA BIG UPGRADE**
