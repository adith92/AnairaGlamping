-- ============================================================================
-- Anaira Glamping & Resort — Database SQL Schema
-- ============================================================================
--
-- File skema database ini dapat di-import langsung ke:
--   1. Shared Hosting MySQL / MariaDB (via phpMyAdmin cPanel)
--   2. Supabase / PostgreSQL (via SQL Editor Supabase Dashboard)
--
-- Skema ini dirancang menggunakan pendekatan hibrida tabel tunggal 'anaira_store'
-- yang menyimpan konfigurasi, data kamar, reservasi, dan voucher secara modular
-- dan berkinerja tinggi, tanpa memicu latensi relasional yang kompleks.
--
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- OPSI A: UNTUK SHARED HOSTING (cPanel MySQL / MariaDB)
-- ─────────────────────────────────────────────────────────────────────────────
-- Petunjuk phpMyAdmin:
--   1. Buka phpMyAdmin di cPanel Anda.
--   2. Buat database baru bernama `anaira_db` (atau sesuai keinginan).
--   3. Masuk ke tab "SQL", salin query di bawah ini, dan klik "Kirim" / "Go".

CREATE TABLE IF NOT EXISTS `anaira_store` (
  `key` VARCHAR(100) NOT NULL COMMENT 'Kunci pengenal data (e.g. bookings, rooms, vouchers)',
  `data` LONGTEXT NOT NULL COMMENT 'Data terstruktur terkompresi berformat JSON string',
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data Awal untuk Kamar (Mencocokkan site-content.json)
-- Ini opsional, karena PMS akan menyinkronkan data secara otomatis saat pertama kali tersambung.


-- ─────────────────────────────────────────────────────────────────────────────
-- OPSI B: UNTUK SUPABASE (PostgreSQL)
-- ─────────────────────────────────────────────────────────────────────────────
-- Petunjuk Supabase:
--   1. Masuk ke Dashboard Supabase Anda (https://supabase.com).
--   2. Buka proyek Anda, lalu navigasi ke menu "SQL Editor" di sidebar kiri.
--   3. Buat "New Query", salin query PostgreSQL di bawah ini, lalu klik "Run".

/*
CREATE TABLE IF NOT EXISTS public.anaira_store (
    key text PRIMARY KEY,
    data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS) demi keamanan proyek Anda
ALTER TABLE public.anaira_store ENABLE ROW LEVEL SECURITY;

-- Buat Kebijakan Akses Publik (Izinkan client-side melakukan SELECT dan UPSERT)
CREATE POLICY "Izinkan akses baca publik" ON public.anaira_store 
    FOR SELECT USING (true);

CREATE POLICY "Izinkan akses tulis publik" ON public.anaira_store 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Izinkan akses edit publik" ON public.anaira_store 
    FOR UPDATE USING (true) WITH CHECK (true);
*/
