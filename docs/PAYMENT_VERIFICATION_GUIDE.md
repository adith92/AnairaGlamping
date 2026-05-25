# 💳 Anaira Payment Verification & Logs Guide
## Manual Bank Transfer, QRIS Approval Desk & Ledger Log

The manual payment proof verification module streamlines administrative workflows for guest checkouts, keeping financial logs secure.

---

## 🛠️ 1. Verification Workflow
1. **Booking Creation:** When a guest selects "Manual QRIS" or "Bank Transfer", a booking record is written to `AnairaDB` with `paymentStatus = "waiting_payment"` and `status = "Pending"`.
2. **Proof Upload:** Guests can input or upload a local proof of transfer path/URL.
3. **Approval Desk:** In `admin/pms.html` ("Payments" tab), a specialized "Manual Verification Desk" lists all bookings in a waiting payment status.
4. **Interactive Viewer:** Clicking the proof thumbnail opens a full-screen, high-fidelity lightbox previewing the uploaded transfer slip.
5. **Approve / Reject Action:**
   - **Approve:** Updates booking status to 'Paid', changes paymentStatus to 'Paid', and triggers `AnairaDB.createPaymentLog()` writing a log entry. The PMS dashboard metrics (Total Revenue) automatically include this amount.
   - **Reject:** Prompts the admin for a reason, logs the rejection note, and sets status to 'Cancelled' and paymentStatus to 'Rejected/Unpaid'.
   - **Refund:** Marks the booking status and paymentStatus as 'Refunded' and adds a refund log.

---

## 📜 2. Financial Ledger Logs
All actions are logged in `anaira_payment_logs` with the following attributes:
- `id`: Generated unique ID prefixed with `LOG-`.
- `bookingId`: Unique reference ID.
- `action`: Type of action taken (`Approve`, `Reject`, `Refund`).
- `prevStatus` & `newStatus` of the transaction.
- `notes`: Custom admin/rejection notes.
- `timestamp`: Complete ISO-8601 string.
CSV logs can be downloaded directly from the "Settings" tab in PMS.
