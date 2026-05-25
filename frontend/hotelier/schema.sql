-- ============================================================================
-- Anaira Glamping & Resort — Database SQL Schema
-- ============================================================================
--
-- Berkas skema database terpadu ini siap di-import untuk:
--   1. Shared Hosting MySQL / MariaDB (via phpMyAdmin cPanel)
--   2. Supabase / PostgreSQL (via SQL Editor Supabase Dashboard)
--
-- Disediakan dua pendekatan skema:
--   - OPSI 1: Pendekatan Key-Value Hibrida (Sangat direkomendasikan untuk 
--             kemudahan integrasi instan dengan frontend).
--   - OPSI 2: Pendekatan Relasional Terstruktur (Untuk analisis database /
--             pelaporan SQL murni).
--
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- PILIHAN 1: SKEMA HYBRID KEY-VALUE (SANGAT DIREKOMENDASIKAN)
-- ─────────────────────────────────────────────────────────────────────────────

-- 1.A. Versi MySQL / MariaDB (Shared Hosting)
CREATE TABLE IF NOT EXISTS `anaira_store` (
  `key` VARCHAR(100) NOT NULL COMMENT 'Kunci pengenal data (e.g. bookings, rooms, vouchers)',
  `data` LONGTEXT NOT NULL COMMENT 'Data terstruktur terkompresi berformat JSON string',
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data Awal Vouchers & Database Config untuk MySQL
INSERT INTO `anaira_store` (`key`, `data`) VALUES 
('vouchers', '[{"code":"ANAIRA10","type":"percentage","value":10,"maxUses":100,"usedCount":0,"active":true},{"code":"WELCOMETOANAIRA","type":"fixed","value":50000,"maxUses":50,"usedCount":0,"active":true}]')
ON DUPLICATE KEY UPDATE `data` = VALUES(`data`);

-- 1.B. Versi PostgreSQL (Supabase)
-- (Salin baris ini ke SQL Editor di Supabase jika menggunakan Supabase)
/*
CREATE TABLE IF NOT EXISTS public.anaira_store (
    key text PRIMARY KEY,
    data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Policies untuk Supabase
ALTER TABLE public.anaira_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Izinkan baca publik" ON public.anaira_store FOR SELECT USING (true);
CREATE POLICY "Izinkan tulis publik" ON public.anaira_store FOR INSERT WITH CHECK (true);
CREATE POLICY "Izinkan edit publik" ON public.anaira_store FOR UPDATE USING (true) WITH CHECK (true);

-- Seed Data Awal Vouchers untuk Supabase
INSERT INTO public.anaira_store (key, data) VALUES 
('vouchers', '[{"code":"ANAIRA10","type":"percentage","value":10,"maxUses":100,"usedCount":0,"active":true},{"code":"WELCOMETOANAIRA","type":"fixed","value":50000,"maxUses":50,"usedCount":0,"active":true}]')
ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;
*/


-- ─────────────────────────────────────────────────────────────────────────────
-- PILIHAN 2: SKEMA RELASIONAL TERSTRUKTUR (OPSIONAL)
-- ─────────────────────────────────────────────────────────────────────────────

-- 2.A. Versi MySQL (Shared Hosting)
CREATE TABLE IF NOT EXISTS `anaira_rooms` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `max_guests` INT NOT NULL DEFAULT 4,
  `weekday_price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `weekend_price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `amenities` TEXT,
  `description` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `anaira_bookings` (
  `booking_id` VARCHAR(50) NOT NULL,
  `guest_name` VARCHAR(255) NOT NULL,
  `guest_email` VARCHAR(255) DEFAULT NULL,
  `guest_phone` VARCHAR(50) NOT NULL,
  `room_type` VARCHAR(50) NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  `nights` INT NOT NULL,
  `total_amount` DECIMAL(12,2) NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'pending',
  `payment_method` VARCHAR(50) DEFAULT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (`room_type`) REFERENCES `anaira_rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `anaira_vouchers` (
  `code` VARCHAR(50) NOT NULL,
  `type` VARCHAR(20) NOT NULL COMMENT 'percentage atau fixed',
  `value` DECIMAL(12,2) NOT NULL,
  `max_uses` INT NOT NULL DEFAULT 100,
  `used_count` INT NOT NULL DEFAULT 0,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Kamar & Voucher Terstruktur (MySQL)
INSERT INTO `anaira_rooms` (`id`, `name`, `quantity`, `max_guests`, `weekday_price`, `weekend_price`, `amenities`, `description`) VALUES
('balcony', 'Balcony Room', 6, 4, 500000.00, 700000.00, 'AC, Android TV, Amenities', 'Comfortable room with private balcony overlooking nature.'),
('porch', 'Porch Room', 6, 4, 350000.00, 420000.00, 'Kipas, Android TV, Amenities', 'Cozy room with charming porch area for relaxation.'),
('villa', 'Villa', 1, 20, 2100000.00, 3000000.00, 'AC, Android TV, Kitchen, Karaoke Set', 'Spacious private villa perfect for group gatherings.')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `anaira_vouchers` (`code`, `type`, `value`, `max_uses`, `used_count`, `active`) VALUES
('ANAIRA10', 'percentage', 10.00, 100, 0, 1),
('WELCOMETOANAIRA', 'fixed', 50000.00, 50, 0, 1)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
