# 💳 Payment Gateway Status — Anaira Glamping PMS

> Last updated: 2026-05-24

## Overview

This document tracks the integration status of all payment gateways planned for the Anaira Glamping & Resort Property Management System. The system is designed with a modular payment adapter architecture, allowing multiple gateways to be enabled or disabled independently.

> [!CAUTION]
> **Secret keys must NEVER be stored in frontend code.**
> All payment gateway secret keys, merchant credentials, and API tokens must reside exclusively on the backend server. The frontend only stores public/client keys and UI configuration.

---

## Status Table

| Gateway | Status | Type | Environment | Notes |
|---------|--------|------|-------------|-------|
| ✅ Manual QRIS | **Ready** | Manual | Production | Scan & upload proof flow |
| ✅ Bank Transfer | **Ready** | Manual | Production | Manual confirmation by admin |
| 🟡 Midtrans | **Scaffold Ready** | API | Sandbox | Needs backend `/api/midtrans/create-transaction` |
| 🟡 Xendit | **Scaffold Ready** | API | Test | Needs backend `/api/xendit/create-invoice` |
| 🔵 DOKU | **Planned** | API | — | Awaiting merchant credentials |
| 🔵 Indopay | **Planned** | API | — | Awaiting API documentation |
| ⚪ UnionPay | **Via Provider** | Acquirer | — | Not direct API; routed through Midtrans/Xendit |

---

## Detailed Gateway Information

### ✅ Manual QRIS — Ready

- **Flow:** Guest scans a static QRIS image → completes payment in their banking app → uploads screenshot of payment proof → admin manually verifies and confirms.
- **Configuration:** Admin uploads QRIS image and sets instruction text via PMS settings.
- **Limitations:** No automatic payment verification; relies on admin review.
- **Files:** Payment settings stored in `localStorage` key `anaira_payment_settings`.

### ✅ Bank Transfer — Ready

- **Flow:** Guest receives bank account details (bank name, account number, account holder) → transfers via ATM/mobile banking → uploads proof → admin manually confirms.
- **Configuration:** Admin sets bank name, account number, and account holder name.
- **Default:** BCA — Anaira Glamping.
- **Limitations:** No automatic reconciliation; admin must match transfers to bookings.

### 🟡 Midtrans — Scaffold Ready

- **Current State:** Frontend adapter scaffold is in place. Client key placeholder exists.
- **What's Needed:**
  1. Backend endpoint: `POST /api/midtrans/create-transaction`
  2. Server-side integration using Midtrans Server Key (never exposed to frontend)
  3. Webhook endpoint: `POST /api/midtrans/webhook` to receive payment notifications
  4. Update booking status to `paid` upon successful webhook callback
- **Environments:** `sandbox` (testing) → `production` (live)
- **Documentation:** [https://docs.midtrans.com](https://docs.midtrans.com)

### 🟡 Xendit — Scaffold Ready

- **Current State:** Frontend adapter scaffold is in place.
- **What's Needed:**
  1. Backend endpoint: `POST /api/xendit/create-invoice`
  2. Server-side integration using Xendit Secret Key
  3. Webhook endpoint: `POST /api/xendit/webhook` for payment callbacks
  4. Update booking status upon `PAID` callback
- **Environments:** `test` → `live`
- **Documentation:** [https://docs.xendit.co](https://docs.xendit.co)

### 🔵 DOKU — Planned

- **Current State:** Adapter placeholder exists with `status: 'planned'`.
- **What's Needed:**
  1. Merchant registration with DOKU
  2. Obtain Merchant ID, Shared Key, and API credentials
  3. Build backend adapter for DOKU's REST API
  4. Implement webhook receiver for payment notifications
- **Documentation:** [https://developer.doku.com](https://developer.doku.com)

### 🔵 Indopay — Planned

- **Current State:** Adapter placeholder exists with `status: 'planned'`.
- **What's Needed:**
  1. Obtain API documentation from Indopay
  2. Register as merchant
  3. Build backend adapter
  4. Implement webhook/callback handler
- **Notes:** API documentation is not yet publicly available; contact Indopay sales team.

### ⚪ UnionPay — Via Provider/Acquirer Only

- **Integration Path:** UnionPay is not integrated directly via API. Instead, it is available as a payment method through acquirers like Midtrans or Xendit.
- **What's Needed:** Enable UnionPay as a payment channel within Midtrans or Xendit dashboard settings.
- **No separate adapter required.**

---

## Webhook Architecture

All API-based payment gateways follow the same callback pattern:

```
Guest initiates payment → Frontend redirects to gateway
     → Gateway processes payment
     → Gateway sends webhook POST to backend
     → Backend verifies signature/token
     → Backend updates booking status in database
     → Backend sends confirmation email/notification
```

### Webhook Security Checklist

- [ ] Verify webhook signature/HMAC for each gateway
- [ ] Use HTTPS-only webhook endpoints
- [ ] Implement idempotency (handle duplicate webhook deliveries)
- [ ] Log all webhook payloads for audit trail
- [ ] Return HTTP 200 promptly to avoid gateway retries
- [ ] Never trust client-side payment status — always verify via webhook

---

## Security Rules

| Rule | Description |
|------|-------------|
| 🔐 No frontend secrets | Server keys, secret keys, and API tokens must NEVER appear in JavaScript, HTML, or localStorage |
| 🔐 Backend-only transactions | Payment transaction creation must happen on the server |
| 🔐 Webhook verification | Always validate webhook signatures before updating booking status |
| 🔐 HTTPS required | All payment endpoints and webhooks must use HTTPS in production |
| 🔐 Audit logging | Log all payment events to `anaira_payment_logs` (localStorage demo) or `payment_logs` table (production DB) |
| 🔐 PCI compliance | Do not store raw card numbers; use tokenization via gateway |

---

## Migration Path: Demo → Production

1. **Phase 1 (Current):** Manual QRIS + Bank Transfer — fully functional in localStorage demo
2. **Phase 2:** Add Midtrans sandbox integration with backend endpoint
3. **Phase 3:** Add Xendit test integration with backend endpoint
4. **Phase 4:** Register with DOKU, build adapter
5. **Phase 5:** Evaluate and integrate Indopay when docs available
6. **Phase 6:** Production deployment with MySQL/PostgreSQL backend, real credentials, and webhook endpoints
