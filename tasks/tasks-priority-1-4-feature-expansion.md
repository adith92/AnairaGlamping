# Tasks Priority 1-4 Feature Expansion Checklist

This checklist tracks the implementation of Priority 1–4 advanced features for Anaira Glamping Booking Website & PMS:

- `[x]` **Priority 1: Booking & Promo Engine**
  - `[x]` **1A. Calendar Availability Visual:** Visual calendar scheduler, Weekend rates markup, Overbook blocker based on quantities (Balcony: 6, Porch: 6, Villa: 1), blocked dates operations (`AnairaDB.createBlockedDate`, list, unblock) and overlap logic: `newCheckIn < existingCheckOut AND newCheckOut > existingCheckIn`.
  - `[x]` **1B. Promo Landing Pages:** Landing catalog (`promo.html`) and four distinct staycation package pages under `promo/` (lebaran, honeymoon, bbq, family) with nette prices, lists, T&C, and direct booking links (`/booking.html?package=SLUG&voucher=CODE`).
  - `[x]` **1C. Voucher Tracking Dashboard:** Revenue after discounts, top vouchers, top influencer conversion analytics, and conversion listings in PMS.

- `[x]` **Priority 2: Guest Experience**
  - `[x]` **2A. Booking Success Page:** Premium glassmorphic `booking-success.html` with route `/booking-success?code=ANR-XXXX`. Renders real booking information, print-invoice (`window.print` custom CSS styles), and WhatsApp admin.
  - `[x]` **2B. Pre-Arrival Guide:** Beautiful responsive `pre-arrival.html` detailing check-in/out hours, list of items to bring, resort guidelines, bonfire rules, and cancel/reschedule policies.
  - `[x]` **2C. Add-On Upsell at Checkout:** Step 3 checkout addons list (Breakfast, BBQ, Honeymoon Decor, Extra Bed, Late Checkout, Api Unggun, Karaoke) calculation and dynamic billing breakdowns.

- `[x]` **Priority 3: Admin Professional**
  - `[x]` **3A. Occupancy Calendar Admin:** Visual monthly grid showing unit occupancy rates (Available, Partial, Full, Blocked) and blocked dates maintenance form in `pms.html`.
  - `[x]` **3B. Payment Verification Panel:** Payment manual proof-of-payment approval desk (Approve, Reject, Refund) with full-screen lightbox preview and payment logs ledger.
  - `[x]` **3C. Excel-Friendly CSV Exports:** UTF-8 BOM CSV exports for Bookings, Revenue, Vouchers, Guests, and Payments.

- `[x]` **Priority 4: Chatbot / AI Concierge**
  - `[x]` **4A. FAQ Chatbot Widget:**Rule-based floating widget in `anaira-chatbot.js` integrated across all pages with zero OpenAI/Claude latency/cost. Answers questions from `data/faq.json`.
  - `[x]` **4B. AI Concierge Stub:** Standard disabled configuration block in chatbot script (`enabled: false`) for future LLM integration.
