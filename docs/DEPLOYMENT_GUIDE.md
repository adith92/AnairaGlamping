# ☁️ Deployment Guide — Anaira Glamping PMS

> **Last Updated:** 2026-05-24  
> **Covers:** Vercel (static frontend), Shared Hosting (PHP backend), Hybrid architecture

---

## 📋 Deployment Overview

| Environment | Platform | Purpose | Cost |
|---|---|---|---|
| 🚀 **Frontend** | Vercel | Static site hosting (HTML/CSS/JS) | Free tier |
| 🖥️ **Backend** | Shared Hosting / VPS | QloApps PHP + MySQL | ~$3–10/mo |
| 🔄 **Hybrid** | Both above | Full production stack | ~$3–10/mo total |

---

## 🚀 Option 1: Vercel Deployment (Static Frontend)

### Prerequisites

- GitHub account with repo access
- [Vercel account](https://vercel.com) (free tier works)
- Node.js 18+ (for CLI, optional)

### Step 1: Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo: `adith92/AnairaGlamping`
4. Click **"Import"**

### Step 2: Configure Project Settings

| Setting | Value |
|---|---|
| **Framework Preset** | Other |
| **Root Directory** | `frontend/hotelier` |
| **Build Command** | *(leave empty)* |
| **Output Directory** | *(leave empty)* |
| **Install Command** | *(leave empty)* |

> ⚠️ **Critical:** The root directory MUST be set to `frontend/hotelier`. Without this, Vercel will try to serve the entire QloApps project (PHP files) which won't work.

### Step 3: Deploy

Click **"Deploy"** and wait ~30 seconds. Your site will be live at:

```
https://your-project.vercel.app
```

### Step 4: Verify Routes

The `vercel.json` already handles clean URLs:

| URL | Serves |
|---|---|
| `/` | `index.html` |
| `/rooms` | `rooms.html` |
| `/gallery` | `gallery.html` |
| `/packages` | `packages.html` |
| `/contact` | `contact.html` |
| `/booking` | `booking.html` |
| `/login` | `login.html` |
| `/admin/*` | Admin panel files |

### Step 5: Custom Domain (Optional)

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your custom domain: `booking.anaira.id` (example)
3. Update DNS records:
   - **CNAME**: `booking` → `cname.vercel-dns.com`
   - Or **A record**: `76.76.21.21`
4. Vercel auto-provisions SSL certificate

### Vercel CLI Alternative

```powershell
# Install Vercel CLI
npm i -g vercel

# Preview deploy
cd frontend\hotelier
vercel --yes

# Production deploy
vercel --prod
```

---

## 🖥️ Option 2: Shared Hosting (PHP Backend)

### Prerequisites

- Shared hosting with PHP 8.1+ and MySQL 5.7+
- cPanel or similar control panel
- FTP/SFTP access or File Manager
- SSL certificate (Let's Encrypt free)

### Required PHP Extensions

```text
✅ PDO_MySQL
✅ cURL
✅ OpenSSL
✅ SOAP
✅ GD
✅ SimpleXML
✅ DOM
✅ Zip
✅ Phar
```

### Step 1: Create Database

1. In cPanel → **MySQL Databases**
2. Create database: `anaira_glamping`
3. Create user: `anaira_admin`
4. Grant **ALL PRIVILEGES** to the user on the database

### Step 2: Upload Files

Upload the entire project (excluding `frontend/hotelier`) to your hosting:

```text
public_html/
├── classes/
├── controllers/
├── modules/
│   ├── midtranspayment/
│   ├── xenditpayment/
│   └── anairamultipayment/
├── config/
├── themes/
├── data/
│   └── seed_anaira.sql
├── index.php
└── ... (other QloApps files)
```

### Step 3: Run QloApps Installer

1. Navigate to `https://your-domain.com/install/`
2. Follow the QloApps installation wizard:
   - Database host: `localhost`
   - Database name: `anaira_glamping`
   - Database user: `anaira_admin`
   - Database password: (your password)
   - Table prefix: `ps_`
3. Complete installation

### Step 4: Import Anaira Seed Data

```sql
-- Via phpMyAdmin or MySQL CLI
USE anaira_glamping;
SOURCE /path/to/data/seed_anaira.sql;
```

### Step 5: Configure Payment Modules

1. Go to **QloApps Back Office** → **Modules** → **Payment**
2. Install and configure:
   - **Midtrans Payment** — Enter sandbox keys
   - **Xendit Payment** — Enter sandbox keys
   - **Anaira Multi Payment** — Configure unified settings

### Step 6: Set Webhook URLs

Configure payment provider dashboards with your backend URLs:

```text
Midtrans:  https://your-domain.com/module/midtranspayment/validation
Xendit:    https://your-domain.com/module/xenditpayment/validation
Multi:     https://your-domain.com/module/anairamultipayment/webhook
```

### Step 7: Security Hardening

```text
✅ Enable HTTPS (SSL/TLS)
✅ Set proper file permissions (644 for files, 755 for directories)
✅ Remove /install/ directory after setup
✅ Restrict access to /admin/ directory
✅ Configure .htaccess for security headers
✅ Enable PHP error logging (not display)
```

---

## 🔄 Option 3: Hybrid Architecture (Recommended)

### Architecture Diagram

```text
┌──────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└──────────┬──────────────────────────────────┬────────────────┘
           │                                  │
    ┌──────▼──────┐                   ┌───────▼───────┐
    │   Vercel    │                   │ Shared Host   │
    │   (Free)    │                   │ / VPS         │
    │             │    REST API       │               │
    │ booking.html│──────────────────▶│ /api/*        │
    │ admin/pms   │                   │ /module/*     │
    │ rooms.html  │◀──────────────────│ /webhooks/*   │
    │ gallery     │    JSON Response  │               │
    │             │                   │  MySQL DB     │
    └─────────────┘                   └───────────────┘
    
    Domain: booking.anaira.id         Domain: api.anaira.id
```

### DNS Configuration

| Subdomain | Type | Target | Purpose |
|---|---|---|---|
| `booking.anaira.id` | CNAME | `cname.vercel-dns.com` | Static frontend |
| `api.anaira.id` | A | `(hosting IP)` | PHP backend API |
| `admin.anaira.id` | A | `(hosting IP)` | QloApps Back Office |

### CORS Configuration

On the PHP backend, add CORS headers:

```php
// In config or .htaccess
Header set Access-Control-Allow-Origin "https://booking.anaira.id"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
Header set Access-Control-Max-Age "86400"
```

### Frontend API Base URL

Update the frontend to use API endpoints:

```javascript
// Configuration
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/api'
  : 'https://api.anaira.id/api';
```

---

## 🧪 Pre-Deployment Checklist

### Frontend (Vercel)

- [ ] ✅ All HTML pages load without errors
- [ ] ✅ Images/assets load correctly (no broken images)
- [ ] ✅ Booking wizard completes all 4 steps
- [ ] ✅ Admin PMS loads and displays data
- [ ] ✅ Mobile responsive tested (iPhone, Android)
- [ ] ✅ `vercel.json` routes configured
- [ ] ✅ OG meta tags set for social sharing
- [ ] ✅ Favicon and Apple touch icon present

### Backend (Shared Hosting)

- [ ] ⬜ PHP 8.1+ verified
- [ ] ⬜ MySQL database created and accessible
- [ ] ⬜ QloApps installer completes successfully
- [ ] ⬜ Seed data imported
- [ ] ⬜ Payment modules installed
- [ ] ⬜ Sandbox credentials configured
- [ ] ⬜ Webhook URLs registered with providers
- [ ] ⬜ HTTPS working on all endpoints
- [ ] ⬜ Error logging enabled (not displayed)
- [ ] ⬜ Backup system configured

---

## 🔧 Troubleshooting

### Vercel Issues

| Problem | Solution |
|---|---|
| 404 on pages | Check `vercel.json` rewrites and root directory setting |
| Images not loading | Verify image paths are relative, not absolute |
| Build fails | Root directory must be `frontend/hotelier`, no build step needed |
| Custom domain not working | Verify DNS propagation (may take up to 48h) |

### Shared Hosting Issues

| Problem | Solution |
|---|---|
| 500 Internal Server Error | Check PHP error log, verify PHP version ≥ 8.1 |
| Database connection fails | Verify credentials in `config/settings.inc.php` |
| Modules not loading | Clear cache: `rm -rf cache/smarty/compile/*` |
| Webhook not received | Check firewall rules, verify HTTPS, check provider logs |

### Common Port Conflicts (Local)

```powershell
# Find what's using port 4173
netstat -ano | findstr :4173

# Kill the process
taskkill /PID <PID> /F

# Restart server
cd frontend\hotelier
node scripts\static-server.js
```

---

## 📊 Hosting Recommendations

| Provider | Type | Price | Best For |
|---|---|---|---|
| **Vercel** | Static hosting | Free | Frontend only |
| **Niagahoster** | Shared hosting | Rp 20k/mo | Budget backend |
| **Dewaweb** | Cloud hosting | Rp 50k/mo | Better performance |
| **DigitalOcean** | VPS | $6/mo | Full control |
| **Hostinger** | Shared hosting | Rp 15k/mo | Cheapest option |
| **AWS Lightsail** | VPS | $5/mo | Scalability |

> 💡 **Recommended for Anaira:** Start with **Vercel (free) + Niagahoster/Dewaweb shared hosting**. Upgrade to VPS when booking volume exceeds 100/month.

---

## 🔐 SSL/HTTPS Setup

### Free SSL Options

1. **Let's Encrypt** — Auto-configured on most shared hosting via cPanel
2. **Cloudflare** — Free SSL proxy (also adds CDN and DDoS protection)
3. **Vercel** — Auto-provisions SSL for custom domains

### SSL Verification

```bash
# Check SSL certificate
curl -vI https://your-domain.com 2>&1 | grep "SSL certificate"

# Or use online tool
# https://www.ssllabs.com/ssltest/
```

---

> 📝 This guide is designed for the Anaira Glamping PMS project. For general QloApps deployment, refer to the [official QloApps documentation](https://docs.qloapps.com).
