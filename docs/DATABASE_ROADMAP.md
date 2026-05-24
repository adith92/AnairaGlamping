# 🗃️ Database Roadmap — Anaira Glamping PMS

> **Created:** 2026-05-24  
> **Purpose:** Migration plan from localStorage demo to production database  
> **Target:** MySQL 5.7+ / MariaDB 10.5+ (QloApps compatible)

---

## 📋 Current State

### localStorage Architecture (Demo)

```text
┌─────────────────────────────┐
│     Browser localStorage    │
│                             │
│  anaira_bookings       []   │
│  anaira_rooms          []   │
│  anaira_guests         []   │
│  anaira_pricing_settings {} │
│  anaira_payment_settings {} │
│  anaira_payment_logs   []   │
│  anaira_blocked_dates  []   │
│  anaira_settings       {}   │
└─────────────────────────────┘
         ⚠️ Per-browser only
         ⚠️ No persistence across devices
         ⚠️ No multi-user support
         ⚠️ No data backup
```

---

## 🎯 Target Architecture

### Phase 1: QloApps MySQL Integration

```text
┌──────────────┐     ┌──────────────────────────┐
│   Frontend   │     │   QloApps PHP Backend    │
│   (Vercel)   │────▶│   MySQL / MariaDB        │
│              │ API │                          │
│   booking    │     │  ps_hotel_booking_detail │
│   admin/pms  │     │  ps_customer             │
│              │     │  ps_anaira_*             │
└──────────────┘     └──────────────────────────┘
```

### Phase 2: Hybrid API Layer (Optional)

```text
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   API Layer  │────▶│   Database   │
│   (Vercel)   │REST │  Node/PHP    │     │   MySQL      │
│              │     │  Express/    │     │              │
│              │     │  Laravel     │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 🗄️ Schema Design

### Anaira Custom Tables (prefixed with `ps_anaira_`)

#### `ps_anaira_bookings`

```sql
CREATE TABLE `_DB_PREFIX_anaira_bookings` (
  `id_booking` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_id` VARCHAR(20) NOT NULL COMMENT 'e.g. ANR-2026-98124',
  `id_customer` INT(11) UNSIGNED DEFAULT NULL,
  `guest_name` VARCHAR(255) NOT NULL,
  `guest_email` VARCHAR(255) NOT NULL,
  `guest_phone` VARCHAR(20) DEFAULT NULL,
  `guest_whatsapp` VARCHAR(20) DEFAULT NULL,
  `room_type` ENUM('Balcony', 'Porch', 'Villa') NOT NULL,
  `room_number` INT(3) UNSIGNED DEFAULT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  `arrival_slot` VARCHAR(50) DEFAULT NULL,
  `nights` INT(5) UNSIGNED NOT NULL DEFAULT 1,
  `amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `payment_method` VARCHAR(100) DEFAULT NULL,
  `payment_status` ENUM('Pending', 'Paid', 'Refunded', 'Cancelled') NOT NULL DEFAULT 'Pending',
  `payment_ref` VARCHAR(255) DEFAULT NULL,
  `special_notes` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_booking`),
  UNIQUE KEY `idx_booking_id` (`booking_id`),
  KEY `idx_check_in` (`check_in`),
  KEY `idx_check_out` (`check_out`),
  KEY `idx_room_type` (`room_type`),
  KEY `idx_payment_status` (`payment_status`),
  KEY `idx_customer` (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### `ps_anaira_rooms`

```sql
CREATE TABLE `_DB_PREFIX_anaira_rooms` (
  `id_room` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_type` ENUM('Balcony', 'Porch', 'Villa') NOT NULL,
  `room_number` INT(3) UNSIGNED NOT NULL,
  `room_name` VARCHAR(100) DEFAULT NULL,
  `capacity` INT(3) UNSIGNED NOT NULL DEFAULT 4,
  `price_weekday` DECIMAL(12,2) NOT NULL,
  `price_weekend` DECIMAL(12,2) NOT NULL,
  `facilities` TEXT DEFAULT NULL COMMENT 'JSON array of facilities',
  `status` ENUM('Available', 'Occupied', 'Maintenance', 'Blocked') NOT NULL DEFAULT 'Available',
  `image` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_room`),
  UNIQUE KEY `idx_room_type_number` (`room_type`, `room_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### `ps_anaira_guests`

```sql
CREATE TABLE `_DB_PREFIX_anaira_guests` (
  `id_guest` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_customer` INT(11) UNSIGNED DEFAULT NULL COMMENT 'Link to ps_customer if registered',
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `whatsapp` VARCHAR(20) DEFAULT NULL,
  `id_number` VARCHAR(50) DEFAULT NULL COMMENT 'KTP/Passport number',
  `total_bookings` INT(5) UNSIGNED NOT NULL DEFAULT 0,
  `total_spent` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `notes` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_guest`),
  KEY `idx_email` (`email`),
  KEY `idx_customer` (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### `ps_anaira_payment_logs`

```sql
CREATE TABLE `_DB_PREFIX_anaira_payment_logs` (
  `id_log` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_booking` INT(11) UNSIGNED NOT NULL,
  `booking_id` VARCHAR(20) NOT NULL,
  `gateway` VARCHAR(50) NOT NULL COMMENT 'midtrans, xendit, qris, bank_transfer',
  `transaction_id` VARCHAR(255) DEFAULT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'IDR',
  `status` VARCHAR(50) NOT NULL,
  `event_type` VARCHAR(100) DEFAULT NULL,
  `event_hash` VARCHAR(64) DEFAULT NULL COMMENT 'SHA256 for idempotency',
  `raw_response` TEXT DEFAULT NULL COMMENT 'Sanitized — no secrets',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_log`),
  KEY `idx_booking` (`id_booking`),
  KEY `idx_booking_id` (`booking_id`),
  KEY `idx_gateway` (`gateway`),
  KEY `idx_event_hash` (`event_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### `ps_anaira_blocked_dates`

```sql
CREATE TABLE `_DB_PREFIX_anaira_blocked_dates` (
  `id_block` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room_type` ENUM('Balcony', 'Porch', 'Villa', 'All') NOT NULL DEFAULT 'All',
  `room_number` INT(3) UNSIGNED DEFAULT NULL COMMENT 'NULL = all rooms of this type',
  `date_from` DATE NOT NULL,
  `date_to` DATE NOT NULL,
  `reason` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_block`),
  KEY `idx_dates` (`date_from`, `date_to`),
  KEY `idx_room_type` (`room_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### `ps_anaira_settings`

```sql
CREATE TABLE `_DB_PREFIX_anaira_settings` (
  `id_setting` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL,
  `setting_value` TEXT DEFAULT NULL,
  `setting_group` VARCHAR(50) NOT NULL DEFAULT 'general',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_setting`),
  UNIQUE KEY `idx_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔄 Migration Phases

### Phase 1: Seed Data Setup 🌱

**Timeline:** Day 1  
**Effort:** Low

1. Create all `ps_anaira_*` tables
2. Seed room inventory:
   - 6 Balcony rooms (B1–B6)
   - 6 Porch rooms (P1–P6)
   - 1 Villa (V1)
3. Seed default settings (pricing, policies, contact)
4. Insert demo bookings for testing

```sql
-- Room seeding example
INSERT INTO `ps_anaira_rooms` (`room_type`, `room_number`, `capacity`, `price_weekday`, `price_weekend`, `facilities`) VALUES
('Balcony', 1, 4, 500000, 700000, '["AC", "Android TV", "Amenities"]'),
('Balcony', 2, 4, 500000, 700000, '["AC", "Android TV", "Amenities"]'),
-- ... (B3-B6)
('Porch', 1, 4, 350000, 420000, '["Kipas", "Android TV", "Amenities"]'),
-- ... (P2-P6)
('Villa', 1, 20, 2100000, 3000000, '["AC", "Android TV", "Kitchen", "Karaoke Set"]');
```

### Phase 2: API Layer 🔌

**Timeline:** Week 1–2  
**Effort:** Medium

Build REST API endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/bookings` | List bookings (with search/filter/pagination) |
| `POST` | `/api/bookings` | Create new booking |
| `PUT` | `/api/bookings/:id` | Update booking |
| `DELETE` | `/api/bookings/:id` | Delete booking |
| `GET` | `/api/rooms` | List rooms with availability |
| `GET` | `/api/rooms/available` | Check availability for date range |
| `GET` | `/api/stats` | Dashboard statistics |
| `POST` | `/api/payments/midtrans/token` | Generate Midtrans snap token |
| `POST` | `/api/payments/xendit/invoice` | Create Xendit invoice |
| `POST` | `/api/webhooks/midtrans` | Midtrans payment callback |
| `POST` | `/api/webhooks/xendit` | Xendit payment callback |
| `POST` | `/api/auth/login` | Admin authentication |
| `POST` | `/api/auth/logout` | Admin logout |

### Phase 3: Frontend Migration 🔀

**Timeline:** Week 2–3  
**Effort:** Medium

1. Replace all `localStorage` calls with API fetch calls
2. Add loading states and error handling
3. Implement JWT token storage and refresh
4. Add offline fallback (optional — cache last known data)

```javascript
// Before (localStorage)
const bookings = JSON.parse(localStorage.getItem('anaira_bookings'));

// After (API)
const response = await fetch('/api/bookings', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const bookings = await response.json();
```

### Phase 4: QloApps Integration 🏨

**Timeline:** Week 3–4  
**Effort:** High

1. Map `ps_anaira_bookings` to QloApps `ps_hotel_booking_detail`
2. Link `ps_anaira_guests` to QloApps `ps_customer`
3. Enable QloApps payment module hooks
4. Configure QloApps Back Office admin for operations

---

## 📊 Data Migration Map

### localStorage → MySQL Field Mapping

| localStorage Field | MySQL Column | Table | Type |
|---|---|---|---|
| `id` / `bookingId` | `booking_id` | `ps_anaira_bookings` | VARCHAR(20) |
| `guest` / `guestName` | `guest_name` | `ps_anaira_bookings` | VARCHAR(255) |
| `email` / `guestEmail` | `guest_email` | `ps_anaira_bookings` | VARCHAR(255) |
| `room` / `roomType` | `room_type` | `ps_anaira_bookings` | ENUM |
| `checkIn` / `checkin` | `check_in` | `ps_anaira_bookings` | DATE |
| `checkOut` / `checkout` | `check_out` | `ps_anaira_bookings` | DATE |
| `method` / `paymentMethod` | `payment_method` | `ps_anaira_bookings` | VARCHAR(100) |
| `amount` | `amount` | `ps_anaira_bookings` | DECIMAL(12,2) |
| `status` | `payment_status` | `ps_anaira_bookings` | ENUM |

---

## 🔒 Security Considerations

1. **Input Validation**
   - Use `pSQL()` for all string inputs (QloApps convention)
   - Cast IDs to `(int)` before SQL
   - Validate dates, amounts, and email formats server-side

2. **Authentication**
   - JWT tokens with 24h expiry
   - Refresh token rotation
   - Rate limiting on login endpoint (5 attempts / 15 min)

3. **API Security**
   - CORS whitelist for Vercel domain only
   - HTTPS enforcement
   - Request body size limits
   - SQL injection prevention via prepared statements

4. **Payment Data**
   - Never store full card numbers
   - Never log API secrets
   - Webhook signature verification mandatory
   - Amount mismatch = auto-reject

---

## ⏱️ Estimated Timeline

| Phase | Duration | Dependencies |
|---|---|---|
| 1. Schema & Seed | 1 day | MySQL server available |
| 2. API Layer | 1–2 weeks | PHP 8.1+ or Node.js |
| 3. Frontend Migration | 1 week | API endpoints ready |
| 4. QloApps Integration | 1–2 weeks | QloApps installed |
| 5. Payment Backend | 1–2 weeks | Sandbox credentials |
| 6. Testing & QA | 1 week | All above complete |
| **Total** | **5–8 weeks** | |

---

> 📝 This roadmap is a living document. Update it as phases are completed and priorities shift.
