# 🧭 Anaira Glamping Next Steps

Current roadmap: **Anaira v3.0 Big Upgrade**

Current completed scope: **PHASE 0 — Documentation & Agent Cleanup**

Next scope: **PHASE 1 — Stabilization & QA**

---

## Read First

Before continuing, read:

```text
README.md
AGENTS.md
docs/MASTERPLAN_ANAIRA_BIG_UPGRADE.md
docs/MASTERPROMPT_ANAIRA_BIG_UPGRADE.md
docs/IMPLEMENTATION_PLAN_ANAIRA_BIG_UPGRADE.md
docs/agent-handoff/PROJECT_STATUS.md
frontend/hotelier/package.json
frontend/hotelier/vercel.json
frontend/hotelier/scripts/anaira-data-lib.js
frontend/hotelier/booking.html
frontend/hotelier/admin/pms.html
```

---

## Immediate Next Steps — Phase 1

### 1. Public Website Smoke Test

Check these routes locally and later on Vercel preview:

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

Acceptance:

```text
[ ] Page loads normally
[ ] No HTML file download regression
[ ] Navigation works
[ ] CTA routes to booking
[ ] Mobile nav works
```

---

### 2. Booking Flow QA

Test:

```text
[ ] Select check-in/check-out
[ ] Select room
[ ] Apply voucher
[ ] Add add-ons
[ ] Review modal opens
[ ] Booking success page shows invoice
[ ] Booking stored in demo mode
[ ] WhatsApp template is correct
[ ] Mobile viewport remains usable
```

Do not rewrite booking logic before documenting the current behavior and failures.

---

### 3. Admin PMS QA

Test:

```text
[ ] Login gate works
[ ] Dashboard renders
[ ] Booking list appears
[ ] Calendar renders
[ ] Payments section opens
[ ] Packages section opens
[ ] Vouchers section opens
[ ] Gallery/settings sections open
[ ] Audit log records admin mutation
[ ] CSV export works
```

Do not replace demo auth with production auth until backend track is selected.

---

### 4. Add E2E Tests

Planned files:

```text
NEW tests/e2e/public-site.spec.js
NEW tests/e2e/booking-flow.spec.js
NEW tests/e2e/admin-pms.spec.js
MOD frontend/hotelier/package.json
```

Keep tests focused on current behavior first. Do not add new product features inside the QA phase.

---

## Do Not Do Yet

```text
[ ] Do not redesign UI.
[ ] Do not deploy.
[ ] Do not deploy repo root.
[ ] Do not add random features.
[ ] Do not move Vercel root.
[ ] Do not add payment secrets to frontend.
[ ] Do not treat LocalStorage as production database.
[ ] Do not rewrite booking/payment logic before QA findings are clear.
[ ] Do not delete files without explicit permission.
```

---

## After Phase 1

Move to **Phase 2 — Production Backend Foundation** only after:

```text
[ ] Public smoke tests pass
[ ] Booking flow QA baseline is documented
[ ] Admin PMS QA baseline is documented
[ ] Known bugs are listed by severity
[ ] Backend track is selected: Supabase / PHP MySQL / Laravel / Next.js
[ ] Env and secret strategy is documented
```

---

## Backup Rule

For local risky edits, create a timestamped backup before editing critical files. Delete the backup after validation passes.

When editing through GitHub connector/API, repository commit history is the rollback path. Do not add permanent backup files to the repo unless explicitly requested.

---

**End of NEXT_STEPS.md**
