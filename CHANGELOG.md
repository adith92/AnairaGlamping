# 🧾 CHANGELOG

## [Final Polish Before Audit] - 2026-05-26

### Added
- Added booking review modal before confirmation
- Added inline validation for guest data
- Added UTM tracking to booking records
- Added WhatsApp templates for admin actions
- Replaced browser confirm with custom admin confirmation modal
- Added audit logs panel and CSV export
- Added trust badges and testimonials
- Added LodgingBusiness JSON-LD schema
- Improved mobile layout and PMS quick actions

## [Priority 1-4 Expansion] - 2026-05-26

### Added
- **Visual Occupancy Calendar Grid:** Visually rich monthly visual grid showing daily occupancy rates (Green/Available, Yellow/Partial, Red/Full, Gray/Blocked) and check-in/out lists.
- **Maintenance date range blocking:** Admins can block single dates or range blocks for a room type (or all rooms) directly via the Calendar panel in PMS. Toggled blocks automatically decrease checkout quantities.
- **Staycation Packages Promo Landing Pages:** Compiled statically under `promo/` catalog (Lebaran, Honeymoon, BBQ, Family Adventure) with clean clean Vercel URL mappings.
- **Add-on Upsells:** A collection of optional checkout add-ons (floating breakfast, BBQ ingredients, romantic deck decor, extra bed, late checkout, private bonfire, bluetooth karaoke) dynamically integrated into Step 3 to maximize Average Order Value.
- **Excel-Friendly CSV Exports:** UTF-8 BOM (`\uFEFF`) encoded exports for bookings, revenues, vouchers, guests, and payments list for professional cPanel backup compatibility.
- **Dynamic Success Receipt (`booking-success.html`):** Renders invoice codes, totals, and stay lists dynamically with window.print tailored @media print sheets.
- **Pre-Arrival Handbook (`pre-arrival.html`):** High-converting instructions guide detailing maps directions, bonfire rules, cancel/reschedule policies.
- **FAQ offline Chatbot widget (`anaira-chatbot.js` & `faq.json`):** rule-based keywords matcher widget on all pages with zero OpenAI/Claude tokens cost. Include configuration stubs for future AI LLM integrations.

### Changed
- **Availability Scheduler Checks:** Integrated dynamic quantity overlap checks on date selection and before step transitions in `booking.html`. Guests cannot overbook Balcony (6), Porch (6), or Villa (1) units.
- **WhatsApp spam sanitization:** Spams of floating WhatsApp buttons removed from all stay pages and restricted exclusively to the Contact and Invoice confirmation screens.
- **PMS payment verification desk:** Approval desk lists all bookings in a waiting payment status, shows transfer proofs in a fullscreen viewer, and saves Verification Logs to `anaira_payment_logs`.
- **Dynamic site CMS builder:** Updated `build-pages.js` compiler to automatically inject the chatbot script tag at correct relative subdirectory levels.

### Fixed
- **Clean Vercel Routes:** Configured clean URL rewrites in `vercel.json` for all promo catalogs, pre-arrival guides, and receipts.
- **Indexed Sitemap:** Included all new staycation and info routes in `sitemap.xml` for optimum SEO.

### Removed
- Cleaned all temporary `.bak` files from the repository after validation successfully passed.
