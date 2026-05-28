# 🗺️ Roadmap Feature Lanjutan — CardioCare Backend

## Feature yang Sudah Ada

| # | Feature | Status |
|---|---------|--------|
| 1 | Register User | ✅ Done |
| 2 | Login / Logout / Refresh Token | ✅ Done |
| 3 | Submit Screening + AI Prediksi | ✅ Done |
| 4 | Riwayat Screening (list) | ✅ Done |
| 5 | Detail Screening | ✅ Done |

---

## 🚀 Fase 1 — Core Completion (Harus Ada)

> Feature-feature ini melengkapi kebutuhan dasar yang masih belum ada.

### 1.1 👤 Profil User (User Profile)
Saat ini tidak ada endpoint untuk melihat/mengubah data diri.

**Endpoint baru:**
```
GET    /api/users/me           → Ambil profil user login
PUT    /api/users/me           → Update nama, email
PUT    /api/users/me/password  → Ganti password (verifikasi password lama)
```

**Tabel yang dibutuhkan:** Cukup tambah kolom `profile_photo`, `phone_number`, `date_of_birth` ke tabel `users`.

**Kompleksitas:** 🟢 Mudah

---

### 1.2 🛡️ Admin Dashboard (RBAC sudah siap!)
Tabel `roles`, `permissions`, `guard.js` sudah disiapkan tapi belum dipakai. Tinggal membuat service admin.

**Endpoint baru:**
```
GET  /api/admin/users              → Daftar semua user (dengan pagination)
GET  /api/admin/users/:id          → Detail user + riwayat screeningnya
DELETE /api/admin/users/:id        → Hapus / nonaktifkan user
GET  /api/admin/stats              → Statistik global (total user, screening, dll)
GET  /api/admin/sessions           → Semua sesi aktif
```

**Kompleksitas:** 🟡 Sedang

---

### 1.3 📊 Health Summary / Dashboard User
Memberikan ringkasan kesehatan user berdasarkan semua screening-nya.

**Endpoint baru:**
```
GET /api/screening/summary
```

**Response contoh:**
```json
{
  "total_screenings": 12,
  "latest_category": "Medium Risk",
  "trend": "improving",        ← bandingkan 3 screening terakhir
  "average_probability": 0.42,
  "risk_count": {
    "Low Risk": 5,
    "Medium Risk": 5,
    "High Risk": 2
  }
}
```

**Kompleksitas:** 🟢 Mudah (pure SQL aggregation)

---

## 🧠 Fase 2 — Intelligence & Personalization

> Feature yang membuat app lebih cerdas dan bernilai tinggi.

### 2.1 📈 Health Trend Analytics
Melacak perubahan kesehatan user dari waktu ke waktu untuk divisualisasikan sebagai grafik.

**Endpoint baru:**
```
GET /api/screening/trends?period=30d    → Data tren 30 hari terakhir
GET /api/screening/trends?period=6m    → Data tren 6 bulan
```

**Response contoh:**
```json
{
  "period": "30d",
  "data_points": [
    { "date": "2026-05-01", "probability": 0.71, "category": "High Risk" },
    { "date": "2026-05-10", "probability": 0.58, "category": "Medium Risk" },
    { "date": "2026-05-24", "probability": 0.43, "category": "Medium Risk" }
  ],
  "trend_direction": "improving"
}
```

**Kompleksitas:** 🟢 Mudah

---

### 2.2 🎯 Health Goals
User bisa menetapkan target kesehatan (misal: turunkan tekanan darah ke normal).

**Endpoint baru:**
```
POST   /api/goals           → Buat goal baru
GET    /api/goals           → Daftar goals user
PUT    /api/goals/:id       → Update/tandai completed
DELETE /api/goals/:id       → Hapus goal
```

**Tabel baru:**
```sql
CREATE TABLE health_goals (
  id           VARCHAR(36) PRIMARY KEY,
  user_id      VARCHAR(36) REFERENCES users(id),
  title        VARCHAR(100) NOT NULL,
  description  TEXT,
  target_value DECIMAL,
  metric_type  VARCHAR(50),   -- 'blood_pressure', 'weight', 'bmi'
  deadline     DATE,
  is_achieved  BOOLEAN DEFAULT false,
  created_at   TIMESTAMP DEFAULT current_timestamp
);
```

**Kompleksitas:** 🟡 Sedang

---

### 2.3 🔔 Notifikasi / Reminder (In-App)
Ingatkan user untuk melakukan screening rutin.

**Endpoint baru:**
```
GET    /api/notifications          → Ambil notifikasi user
PUT    /api/notifications/:id/read → Tandai sudah dibaca
DELETE /api/notifications/:id      → Hapus notifikasi
```

**Tabel baru:**
```sql
CREATE TABLE notifications (
  id         VARCHAR(36) PRIMARY KEY,
  user_id    VARCHAR(36) REFERENCES users(id),
  title      VARCHAR(100) NOT NULL,
  message    TEXT NOT NULL,
  type       VARCHAR(50),      -- 'reminder', 'alert', 'info'
  is_read    BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT current_timestamp
);
```

**Trigger:** Otomatis buat notifikasi "waktunya screening!" jika user tidak screening selama 30 hari.

**Kompleksitas:** 🟡 Sedang

---

## 🔬 Fase 3 — Advanced Features

> Feature premium untuk memperluas nilai produk.

### 3.1 📋 Export Laporan PDF
User bisa download hasil screening sebagai laporan medis PDF.

**Endpoint baru:**
```
GET /api/screening/histories/:screeningId/export  → Return PDF stream
```

**Package:** `pdfkit` atau `puppeteer`

**Kompleksitas:** 🔴 Kompleks

---

### 3.2 🔐 Multi-Device Session Management
Tabel `user_sessions` sudah ada! Tinggal expose endpoint-nya ke user.

**Endpoint baru:**
```
GET    /api/auth/sessions           → Lihat semua device yang login
DELETE /api/auth/sessions/:id       → Kick device tertentu
DELETE /api/auth/sessions           → Logout dari semua device
```

**Kompleksitas:** 🟢 Mudah (data sudah ada di DB!)

---

### 3.3 🏥 Artikel / Edukasi Kesehatan
Konten edukasi tentang kesehatan jantung yang bisa dikelola admin.

**Endpoint baru:**
```
GET  /api/articles              → List artikel (publik)
GET  /api/articles/:slug        → Detail artikel
POST /api/admin/articles        → Buat artikel (admin only)
PUT  /api/admin/articles/:id    → Edit artikel (admin only)
```

**Tabel baru:**
```sql
CREATE TABLE articles (
  id          VARCHAR(36) PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  slug        VARCHAR(200) UNIQUE NOT NULL,
  content     TEXT NOT NULL,
  category    VARCHAR(50),
  thumbnail   VARCHAR(255),
  author_id   VARCHAR(36) REFERENCES users(id),
  is_published BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT current_timestamp,
  updated_at  TIMESTAMP DEFAULT current_timestamp
);
```

**Kompleksitas:** 🟡 Sedang

---

## 📌 Ringkasan & Rekomendasi Prioritas

| Prioritas | Feature | Alasan |
|-----------|---------|--------|
| ⭐⭐⭐ | User Profile (`/api/users/me`) | Kebutuhan dasar yang pasti dibutuhkan frontend |
| ⭐⭐⭐ | Admin Dashboard | RBAC sudah siap, tinggal implementasi |
| ⭐⭐⭐ | Health Summary | Simple tapi sangat bernilai untuk UX |
| ⭐⭐ | Multi-Device Session | Data sudah ada, tinggal expose endpoint |
| ⭐⭐ | Health Trend Analytics | Nilai tambah besar, query sederhana |
| ⭐⭐ | Notifikasi | Meningkatkan engagement user |
| ⭐ | Health Goals | Fitur tambahan motivasi |
| ⭐ | Artikel Edukasi | Konten marketing + edukasi |
| ⭐ | Export PDF | Nice-to-have, kompleksitas tinggi |

---

## 🛠️ Yang Harus Diperbaiki Sebelum Lanjut

> Sebelum mengembangkan fitur baru, **perbaiki bug kritis ini terlebih dahulu:**

1. ✅ Tambahkan `expiresIn` ke JWT token
2. ✅ Perbaiki `gender` validator (valid 1 atau 2, bukan 0 atau 1)
3. ✅ Tambah `try/catch` di `refreshToken` dan `logout`
4. ✅ Export `guard.js` (wajib untuk Admin Dashboard)
5. ✅ Pindahkan URL ML ke `.env` variable
