# 🌟 Feature Expansion Priority 1–4 Overview
## Anaira Glamping Booking Website & PMS

This document outlines the architecture, integrations, and operational guides for all advanced features built during the Priority 1–4 Expansion phase.

---

## 📅 1. Calendar Availability & Maintenance Blocking
- **Front-End Guest Validation:** Guest stay dates are validated in real-time. If the chosen unit (Balcony, Porch, or Villa) is fully booked or blocked on the selected dates, the wizard prevents proceeding to Step 3.
- **Quantity Constraints:**
  - **Balcony Suite:** 6 Units total.
  - **Porch Cabin:** 6 Units total.
  - **Presidential Villa:** 1 Unit total.
- **Overlap Logic:** Booking overlap is mathematically computed as:
  `newCheckIn < existingCheckOut AND newCheckOut > existingCheckIn`
- **Maintenance/Date Blocking:** Admins can block single dates or date ranges for a room type (or all rooms) directly via the Calendar panel in the PMS. Dates blocked are parsed automatically as zero-availability blocks on the checkout wizard.

---

## 🎟️ 2. Promo Staycation & Voucher Conversion
- **Promo Landing Pages:** Standard clean URLs are handled by `vercel.json` and compiled statically via `build-pages.js` into professional, highly-engaging staycation landing pages under `promo/` (Lebaran Family, Honeymoon Romantic, Weekend BBQ, Family Adventure).
- **Voucher tracking & conversion metrics:** Booking logs capture promo sources (IG, Threads, Influencer, Partner, Website) and dynamically link influencer names. Ad-hoc analytics calculate life-time values, converted revenue, and remaining quotas in the Vouchers PMS pane.

---

## 🛎️ 3. Guest Journey: Receipts, Guides, and Add-ons
- **Dynamic Success Receipt (`booking-success.html`):** Redirected upon successful booking with the generated code. Pulls reservation details dynamically and provides a printer-friendly invoice layout (`window.print()`).
- **Pre-Arrival Handbook (`pre-arrival.html`):** Contains vital arrival instructions (Google Maps coordinates, quiet hours, what to bring, resort guidelines, reschedule policy) to prevent friction.
- **Add-on Upsells:** A collection of optional checkout add-ons (floating breakfast, BBQ ingredients, romantic deck decor, extra bed, late checkout, private bonfire, bluetooth karaoke) dynamically integrated into Step 3 to maximize Average Order Value (AOV).

---

## 📊 4. Admin Professional & CSV Exports
- **Occupancy Monthly Grid:** Interactive calendar visual mapping daily units filled and maintenance blocks. Clicking a date displays check-in and check-out logs in a modal.
- **Manual Payment Verification Desk:** Captures guest proof-of-payment bank/QRIS uploads with a sleek fullscreen viewer.
- **Excel-Friendly CSV Exports:** UTF-8 BOM (`\uFEFF`) encoded exports for bookings, revenues, vouchers, guests, and payments list for professional accountants.

---

## 💬 5. Rule-Based Offline-First FAQ Chatbot Widget
- **No API Costs:** Runs completely client-side in `anaira-chatbot.js` and loads answers from `data/faq.json`.
- **Trigger Pulse:** Includes a gorgeous forest green bubble with an unread blinking pulse.
- **LLM AI Concierge Hook:** Equipped with a standard config stub (`anaira_ai_settings`) to allow quick serverless LLM hookup if needed in the future.
