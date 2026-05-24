# ✅ Admin Settings Checklist — Anaira Glamping PMS

> **Last Updated:** 2026-05-24  
> **Scope:** All configurable settings across Admin PMS, Content Editor, and application configuration

---

## 📋 Checklist Legend

| Icon | Meaning |
|---|---|
| ✅ | Fully implemented and working |
| 🟡 | Implemented but demo/localStorage only |
| ⚠️ | Partially implemented or needs backend |
| ❌ | Not yet implemented |

---

## 🧾 PMS Dashboard Settings

### Booking Management

- [x] ✅ Create new booking (modal form)
- [x] ✅ Edit existing booking (all fields)
- [x] ✅ Delete booking (confirmation modal)
- [x] ✅ Search bookings (by name, email, room, booking ID)
- [x] ✅ Filter by status (All / Paid / Pending / Refunded)
- [x] ✅ Auto-generate booking ID (ANR-2026-XXXXX format)
- [x] ✅ Auto-suggest pricing (rate × nights calculation)
- [ ] ⚠️ Pagination for large booking lists
- [ ] ❌ Export bookings to CSV/Excel
- [ ] ❌ Bulk actions (mass status update, mass delete)

### Guest Information Fields

- [x] ✅ Guest full name
- [x] ✅ Guest email address
- [x] ✅ Room category selection (Balcony / Porch / Villa)
- [x] ✅ Check-in date picker
- [x] ✅ Check-out date picker
- [x] ✅ Payment method dropdown
- [x] ✅ Total amount (auto-suggested)
- [x] ✅ Payment status (Paid / Pending / Refunded)
- [ ] ⚠️ Guest phone/WhatsApp number (available in booking wizard, not in PMS edit)
- [ ] ❌ Number of guests count
- [ ] ❌ Special requests/notes field in PMS

### Payment Methods in PMS

- [x] ✅ Transfer Bank (BCA)
- [x] ✅ Transfer Bank (Mandiri)
- [x] ✅ E-Wallet (Gopay)
- [x] ✅ Credit Card
- [x] ✅ Tunai / Cash
- [ ] ⚠️ QRIS payment tracking
- [ ] ❌ Midtrans transaction ID linking
- [ ] ❌ Xendit invoice ID linking

---

## 📊 Dashboard Statistics

- [x] ✅ Total Revenue (sum of Paid bookings in IDR)
- [x] ✅ Active Bookings count (Paid + Pending)
- [x] ✅ Balcony occupancy (count / 6 with progress bar)
- [x] ✅ Porch occupancy (count / 6 with progress bar)
- [x] ✅ Villa occupancy (count / 1 with progress bar)
- [x] ✅ Live server time widget (updating every second)
- [ ] ❌ Revenue trend chart (daily/weekly/monthly)
- [ ] ❌ Booking trend chart
- [ ] ❌ Average stay duration metric
- [ ] ❌ Revenue per room type breakdown
- [ ] ❌ Cancellation/refund rate

---

## ✏️ Content Editor Settings

### Brand Configuration

- [x] ✅ Business name (`Anaira Glamping & Resort`)
- [x] ✅ Tagline (`Stay, Relax & Recharge Near Curug Nangka`)
- [x] ✅ Description text
- [x] ✅ Logo black variant path
- [x] ✅ Logo white variant path

### Contact Information

- [x] ✅ Street address
- [x] ✅ Google Maps URL
- [x] ✅ WhatsApp display number
- [x] ✅ WhatsApp international format

### Operational Policies

- [x] ✅ Check-in time (13:00)
- [x] ✅ Check-out time (12:00)
- [x] ✅ Early/late check-in/out policy text
- [x] ✅ Cancellation/refund policy text

### Room Configuration

For each room type (Balcony, Porch, Villa):

- [x] ✅ Room ID
- [x] ✅ Room name
- [x] ✅ Quantity (inventory count)
- [x] ✅ Capacity (max guests)
- [x] ✅ Weekday price
- [x] ✅ Weekend price
- [x] ✅ Facilities list
- [x] ✅ Room image path
- [x] ✅ Room description
- [ ] ❌ Seasonal pricing rules
- [ ] ❌ Minimum stay rules
- [ ] ❌ Room-specific blocked dates

### Packages

- [x] ✅ Breakfast package
- [x] ✅ BBQ package
- [x] ✅ Honeymoon package
- [x] ✅ Family package
- [ ] ❌ Package pricing
- [ ] ❌ Package image
- [ ] ❌ Package availability rules

### Facilities

- [x] ✅ Pool (with image)
- [x] ✅ Cafe (with image)
- [x] ✅ Bonfire (with image)
- [x] ✅ Parking (with image)
- [ ] ❌ Facility description
- [ ] ❌ Operating hours

### Gallery

- [x] ✅ 5 gallery images configured
- [x] ✅ Image upload to `assets/images/uploads/`
- [ ] ❌ Gallery image reordering
- [ ] ❌ Gallery image captions
- [ ] ❌ Gallery categories/albums

### Video

- [x] ✅ Video source path
- [x] ✅ Video poster image
- [ ] ❌ Multiple video support

---

## 💳 Payment Configuration

### Manual Payment Methods

- [x] ✅ Manual QRIS QR code display
- [x] ✅ Bank transfer details
- [ ] ❌ QRIS image upload in admin
- [ ] ❌ Bank account details configuration

### Payment Gateway Scaffolds

- [x] 🟡 Midtrans module scaffold (`modules/midtranspayment/`)
  - [ ] ❌ Server key configuration
  - [ ] ❌ Client key configuration
  - [ ] ❌ Sandbox/production toggle
  - [ ] ❌ Webhook URL configuration
- [x] 🟡 Xendit module scaffold (`modules/xenditpayment/`)
  - [ ] ❌ Secret key configuration
  - [ ] ❌ Callback token configuration
  - [ ] ❌ Sandbox/production toggle
  - [ ] ❌ Webhook URL configuration
- [x] 🟡 Unified payment module (`modules/anairamultipayment/`)
  - [ ] ❌ Multi-provider configuration
  - [ ] ❌ Payment routing rules
  - [ ] ❌ Fallback payment method

---

## 🔐 Authentication & Security Settings

- [x] 🟡 Admin login (username/password)
- [x] 🟡 Session-based access control (`sessionStorage`)
- [x] ✅ Unauthorized access redirect
- [x] ✅ Logout functionality
- [ ] ❌ Password change/reset
- [ ] ❌ Multi-user admin accounts
- [ ] ❌ Role-based permissions
- [ ] ❌ Login attempt rate limiting
- [ ] ❌ Two-factor authentication (2FA)
- [ ] ❌ Session timeout configuration
- [ ] ❌ Audit log / activity log

---

## 🌐 Deployment Settings

### Vercel Configuration (`vercel.json`)

- [x] ✅ Clean URL routing (`/rooms` → `rooms.html`)
- [x] ✅ SPA fallback for admin routes
- [x] ✅ Static file serving configuration
- [ ] ❌ Custom domain configuration
- [ ] ❌ Environment variables for API keys
- [ ] ❌ Edge functions for backend API

### Node.js Scripts

- [x] ✅ `static-server.js` — Local file serving (port 4173)
- [x] ✅ `admin-server.js` — Content editor API
- [x] ✅ `build-pages.js` — HTML template builder from JSON
- [x] ✅ `start-local.ps1` — PowerShell launcher

---

## 📱 LocalStorage Keys Audit

| Key | Used By | Documented | Clearable |
|---|---|---|---|
| `anaira_bookings` | PMS + Booking Wizard | ✅ | ✅ |
| `anaira_rooms` | Room Management | ✅ | ✅ |
| `anaira_guests` | Guest Management | ✅ | ✅ |
| `anaira_pricing_settings` | Pricing Config | ✅ | ✅ |
| `anaira_payment_settings` | Payment Config | ✅ | ✅ |
| `anaira_payment_logs` | Payment Tracking | ✅ | ✅ |
| `anaira_blocked_dates` | Calendar Blocking | ✅ | ✅ |
| `anaira_settings` | General Settings | ✅ | ✅ |
| `isAdmin` (sessionStorage) | Auth Guard | ✅ | Auto-cleared on tab close |

---

## 📊 Completion Summary

| Section | Items | Done | Percentage |
|---|---:|---:|---:|
| Booking Management | 10 | 7 | 70% |
| Guest Fields | 11 | 8 | 73% |
| Payment Methods | 8 | 5 | 63% |
| Dashboard Stats | 11 | 6 | 55% |
| Content Editor | 35 | 28 | 80% |
| Payment Config | 15 | 3 | 20% |
| Security | 11 | 4 | 36% |
| Deployment | 10 | 7 | 70% |
| **TOTAL** | **111** | **68** | **61%** |

> 💡 **Key Insight:** The frontend demo is ~80% feature-complete. The remaining 39% mostly requires backend infrastructure (real database, server-side auth, payment API integration) — not frontend work.

---

> 📝 This checklist should be updated as features are implemented. Items marked ❌ are candidates for the next development sprint.
