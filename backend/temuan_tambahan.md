# 🔍 Temuan Tambahan — CardioCare Backend

> Dimensi yang belum dibahas selain Bug dan Feature Roadmap.

---

## 1. 📄 Dokumentasi & Inkonsistensi Data

### 🔴 Postman Collection Tidak Sinkron dengan Kode

File `postman_collection.json` masih menggunakan body **lama** yang tidak sesuai dengan validator saat ini:

```json
// Postman Collection (lama):
{
  "fullName": "Test User",
  "username": "testuser",       ← ❌ tidak ada di validator!
  "birthDate": "1990-01-01",    ← ❌ tidak ada di validator!
  "email": "testuser@example.com",
  "password": "secret123"
}
```

```js
// Validator aktual (schema.js):
Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // username & birthDate tidak ada!
});
```

**Akibat:** Test di Postman untuk registrasi **pasti gagal** karena body tidak sesuai. Postman collection juga hanya punya 3 test case (registrasi saja) — tidak ada untuk Login, Screening, dll.

---

### 🟡 Tidak Ada README.md

Proyek sama sekali tidak punya `README.md`. Tidak ada dokumentasi cara:
- Setup environment
- Menjalankan migrasi DB
- Menjalankan server
- Menghubungkan ke ML service

---

### 🟡 Test Message Postman Tidak Akurat

```js
// Di Postman test script:
pm.expect(jsonData.message).to.eql('User berhasil ditambahkan');

// Tapi response aktual dari controller:
return response(res, 201, 'Registrasi Berhasil', { id: user });
// ↑ Pesan berbeda! Test otomatis Postman akan selalu FAIL.
```

---

## 2. 🔐 Keamanan Lanjutan

### 🔴 Tidak Ada Helmet.js

[Helmet](https://helmetjs.github.io/) adalah middleware wajib Express untuk mengatur HTTP security headers. Tanpa ini, response API tidak memiliki perlindungan dari:
- `X-Powered-By: Express` (mengekspos teknologi stack)
- Clickjacking (tanpa `X-Frame-Options`)
- XSS (tanpa `Content-Security-Policy`)
- MIME sniffing attack (tanpa `X-Content-Type-Options`)

```js
// Yang harus ditambahkan di server/index.js:
import helmet from 'helmet';
app.use(helmet());
```

---

### 🟡 bcrypt Rounds Tidak Dikonfigurasi via ENV

```js
const hashedPassword = await bcrypt.hash(password, 10); // hardcoded!
```

`10` rounds adalah standar minimum. Untuk production, idealnya `12` dan dikontrol via environment variable sehingga mudah disesuaikan.

```js
const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

---

### 🟡 Refresh Token Tidak Pernah Divalidasi Expiry-nya di DB

Meskipun `is_revoked` ada di tabel `user_sessions`, query `verifyRefreshToken` tidak menggunakannya:

```js
// auth-repositories.js (saat ini):
text: 'SELECT refresh_token FROM user_sessions WHERE refresh_token = $1',
// ↑ Tidak cek is_revoked = false!

// Yang seharusnya:
text: 'SELECT refresh_token FROM user_sessions WHERE refresh_token = $1 AND is_revoked = false',
```

Artinya refresh token yang sudah direvoke tetap bisa digunakan untuk mendapatkan access token baru.

---

### 🟡 Tidak Ada Validasi Ownership di `getDetailScreeningById`

```js
// medical-records-controller.js:
const screeningId = req.params.screeningId;
const row = await medicalRecordsRepositories.detailScreeningById(screeningId);
// ↑ Tidak cek apakah screening milik user yang login!
```

User A bisa mengakses detail screening milik User B hanya dengan menebak `screeningId`. Ini adalah **Broken Object Level Authorization (BOLA)** — salah satu kerentanan OWASP API Security Top 10.

**Fix:**
```js
// Query harus include WHERE user_id = $2
async detailScreeningById(screeningId, userId) {
  // ... WHERE s.id = $1 AND s.user_id = $2
}
```

---

## 3. 🗄️ Kualitas Database

### 🟡 `updated_at` Tidak Auto-Update

```js
// Tabel users punya kolom updated_at, tapi:
// 1. Tidak ada trigger PostgreSQL untuk auto-update
// 2. Saat ini hanya di-set saat INSERT, tidak saat UPDATE
```

Untuk konsistensi, perlu trigger DB atau update manual setiap query UPDATE:
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

### 🟡 Tidak Ada Soft Delete

Ketika user dihapus (`DELETE CASCADE`), semua data terkait (health_monitoring, screening, dll) ikut terhapus permanen. Untuk aplikasi kesehatan, ini berbahaya karena data rekam medis bisa hilang tanpa jejak.

**Disarankan:** Tambahkan kolom `deleted_at TIMESTAMP` dan query selalu filter `WHERE deleted_at IS NULL`.

---

### 🟢 `varchar(255)` untuk password sudah benar

bcrypt menghasilkan hash 60 karakter — `varchar(255)` sudah cukup aman.

---

## 4. 🚢 Kesiapan Deployment (DevOps)

### 🔴 `start:prod` Tidak Bisa Dijalankan di Windows

```json
"start:prod": "NODE_ENV=production node src/server.js"
```

Sintaks `NODE_ENV=production` adalah Unix-only. Di Windows PowerShell akan error. Gunakan package **cross-env**:

```json
"start:prod": "cross-env NODE_ENV=production node src/server.js"
```

---

### 🟡 Tidak Ada Dockerfile

Tidak ada `Dockerfile` atau `docker-compose.yml`, sehingga deployment ke server atau container platform (Railway, Fly.io, GCP) menjadi lebih sulit dan tidak reproducible.

**Minimal Dockerfile yang dibutuhkan:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

---

### 🟡 Tidak Ada Health Check Endpoint

Tidak ada endpoint `GET /health` atau `GET /ping` yang bisa digunakan oleh load balancer / container orchestrator (Docker, Kubernetes) untuk memastikan server masih hidup.

```js
// Minimal:
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

---

### 🟡 Tidak Ada Logging yang Proper

Saat ini hanya ada `console.log` dan `console.error` acak. Untuk production perlu library logging terstruktur seperti **Winston** atau **Pino** yang mendukung:
- Log levels (info, warn, error)
- Log format JSON (untuk parsing di monitoring tools)
- Log file rotation

---

## 5. 💻 Kualitas Kode

### 🟡 Setiap Repository Membuat `Pool` Baru

```js
// auth-repositories.js
class AuthRepositories {
  constructor() { this.pool = new Pool(); } // ← Pool ke-1
}

// user-repositories.js
class UserRepositories {
  constructor() { this.pool = new Pool(); } // ← Pool ke-2
}

// medical-records-repositories.js
class MedicalRecordsRepositories {
  constructor() { this.pool = new Pool(); } // ← Pool ke-3
}
```

Ini membuat **3 connection pool terpisah**. Sebaiknya buat satu pool yang dishare:

```js
// src/database/pool.js
import { Pool } from 'pg';
const pool = new Pool();
export default pool;

// Lalu di setiap repository:
import pool from '../../../database/pool.js';
```

---

### 🟡 ESLint Ada tapi Tidak Ada Config File

`package.json` punya script `"lint": "eslint ./src"` dan dependency `eslint-config-dicodingacademy`, tapi tidak ada file `eslint.config.js` atau `.eslintrc` di root proyek — jadi ESLint tidak akan berjalan dengan benar.

---

### 🟢 Tidak Ada `.env.example`

File `.env` ada di `.gitignore` (bagus!), tapi tidak ada `.env.example` sebagai template. Developer baru atau deployment baru tidak tahu variabel apa yang dibutuhkan.

**Buat file `.env.example`:**
```env
PORT=5000
HOST=localhost
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=your_password
PGDATABASE=cardio
PGPORT=5432
ACCESS_TOKEN_KEY=your_secret_access_key
REFRESH_TOKEN_KEY=your_secret_refresh_key
ML_SERVICE_URL=http://127.0.0.1:8000
BCRYPT_ROUNDS=12
```

---

## 📊 Ringkasan Semua Temuan (3 Laporan)

| Kategori | Kritis 🔴 | Sedang 🟡 | Minor 🟢 | Total |
|----------|-----------|-----------|----------|-------|
| Bug & Logic | 5 | 7 | 4 | **16** |
| Temuan Tambahan | 3 | 12 | 2 | **17** |
| **Grand Total** | **8** | **19** | **6** | **33** |

---

## 🎯 Rekomendasi Urutan Perbaikan

```
1. [SECURITY]   Tambah expiresIn ke JWT
2. [SECURITY]   Tambah WHERE is_revoked = false di verifyRefreshToken
3. [SECURITY]   Tambah ownership check di getDetailScreeningById  ← BOLA
4. [SECURITY]   Install & pakai Helmet.js
5. [BUG]        Perbaiki gender validator (valid 1,2 bukan 0,1)
6. [BUG]        Tambah try/catch di refreshToken & logout
7. [BUG]        Export guard.js
8. [CONFIG]     Pindahkan ML URL ke .env (ML_SERVICE_URL)
9. [DEPLOY]     Ganti start:prod pakai cross-env
10. [DOCS]      Update Postman collection & buat README.md
11. [DB]        Tambah trigger updated_at & cek is_revoked
12. [CODE]      Buat shared DB pool
13. [CODE]      Bersihkan console.log debug
14. [FUTURE]    Tambah cors, rate-limit, health check endpoint
```
