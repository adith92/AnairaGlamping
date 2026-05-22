# 🔧 Local Preview Fix

Panduan ini untuk memperbaiki kasus browser menampilkan:

```text
This site can't be reached
localhost refused to connect
ERR_CONNECTION_REFUSED
```

Masalah itu biasanya terjadi karena **server local belum berjalan**, bukan karena halaman rusak.

---

## ✅ Cara Menjalankan Frontend Local

Buka PowerShell, lalu jalankan:

```powershell
cd "E:/Vibes CODING/AnairaGlamping/frontend/hotelier"
node scripts/static-server.js
```

Kalau sukses, terminal akan menampilkan:

```text
Anaira local preview running at http://localhost:4173
```

Lalu buka browser:

```text
http://localhost:4173/
```

---

## ✅ Halaman yang Perlu Dicek

```text
http://localhost:4173/
http://localhost:4173/rooms
http://localhost:4173/gallery
http://localhost:4173/packages
http://localhost:4173/contact
```

---

## ⚠️ Kalau Node Belum Ada

Cek:

```powershell
node --version
```

Kalau tidak muncul versi Node, install Node.js LTS dulu.

---

## ✅ Launcher Alternatif

```powershell
cd "E:/Vibes CODING/AnairaGlamping/frontend/hotelier"
./scripts/start-local.ps1
```

Script ini akan mencoba Node dulu, lalu fallback ke Python atau PHP jika tersedia.

---

## 📌 Catatan

Frontend static tidak butuh PHP untuk preview. PHP hanya dibutuhkan untuk backend QloApps dan payment module validation.
