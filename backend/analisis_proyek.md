# 🫀 Analisis Proyek CardioCare Backend

## Ringkasan Umum

**CardioCare** adalah REST API backend untuk aplikasi skrining kesehatan jantung berbasis AI. Dibangun dengan **Node.js + Express**, terhubung ke **PostgreSQL**, dan mengintegrasikan sebuah **ML model service** eksternal (Python/FastAPI di port 8000) untuk prediksi risiko kardiovaskular.

---

## 🏗️ Arsitektur Proyek

```
backend/
├── src/
│   ├── server.js              # Entry point
│   ├── server/index.js        # Express app setup
│   ├── routes/index.js        # Root router
│   ├── middleware/            # auth, validate, guard, error
│   ├── security/              # JWT token manager
│   ├── exceptions/            # Custom error classes
│   ├── utils/                 # response helper, predict (axios ke ML)
│   └── services/
│       ├── auth/              # Login, Refresh Token, Logout
│       ├── users/             # Register
│       └── medical-records/   # Screening & Riwayat
└── migrations/                # 10 file migrasi DB (node-pg-migrate)
```

**Pola arsitektur per service:** `controller → repositories → DB`
dengan lapisan `routes → middleware (validate/auth) → controller`

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|-----------|
| `POST` | `/api/users/register` | ❌ | Registrasi user baru |
| `POST` | `/api/auth/login` | ❌ | Login, dapat Access + Refresh Token |
| `PUT` | `/api/auth/refresh-token` | ❌ | Perbarui Access Token |
| `DELETE` | `/api/auth/logout` | ❌ | Hapus sesi (logout) |
| `POST` | `/api/screening` | ✅ JWT | Submit data klinis → AI prediksi |
| `GET` | `/api/screening/histories` | ✅ JWT | Ambil riwayat skrining user |
| `GET` | `/api/screening/histories/:screeningId` | ✅ JWT | Detail skrining tertentu |

---

## ✅ Hal-hal yang Sudah Bagus

- **Struktur modular & rapi** — setiap service memiliki layer `controller`, `repositories`, `routes`, `validator` yang terpisah dengan baik.
- **Validasi input dengan Joi** — semua payload divalidasi sebelum masuk ke controller.
- **Database transaction** — `addMedicalRecord` menggunakan `BEGIN/COMMIT/ROLLBACK` dengan benar.
- **Permission system (RBAC)** — ada tabel `roles`, `permissions`, `role_permissions`, dan middleware `guard.js` sudah disiapkan.
- **Session tracking** — tabel `user_sessions` menyimpan device info, IP, dan last_used_at.
- **Error handler terpusat** — `middleware/error.js` menangani berbagai jenis error (ClientError, Joi, Axios, DB).
- **Index database** — migration sudah menambahkan index pada kolom yang sering di-query.

---

## 🐛 Bug & Masalah yang Ditemukan

### 🔴 KRITIS

#### 1. `gender` validator tidak konsisten dengan data yang dikirim ke ML
**File:** `medical-records/validator/schema.js` baris 5
```js
// Validator menerima 0 atau 1
gender: Joi.number().integer().valid(0, 1).required(),

// Tapi mapping di controller menggunakan 1 dan 2
const genderMapping = { 1: 'Perempuan', 2: 'Laki-laki' };
```
**Masalah:** Jika user kirim `gender: 0`, mapping akan return `undefined`. Harus konsisten: gunakan `valid(1, 2)` di schema, atau ubah mapping ke `{ 0: 'Perempuan', 1: 'Laki-laki' }`.

---

#### 2. `refreshToken` controller tidak menggunakan `try/catch`
**File:** `auth-controller.js` baris 38–51
```js
export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.validated;
  const result = await authRepositories.verifyRefreshToken(refreshToken); // ❌ tidak ada try/catch!
  ...
};
```
Jika DB error, exception akan menjadi **unhandled rejection** yang bisa crash server. Harus dibungkus `try/catch`.

---

#### 3. `logout` controller juga tidak ada `try/catch`
**File:** `auth-controller.js` baris 53–61
```js
export const logout = async (req, res, next) => {
  const { refreshToken } = req.validated;
  const result = await authRepositories.verifyRefreshToken(refreshToken); // ❌ tidak ada try/catch!
  ...
};
```
Sama seperti di atas — rentan crash jika DB tidak tersedia.

---

#### 4. Token JWT tidak punya expiry time (`expiresIn`)
**File:** `security/token-manager.js` baris 5–8
```js
generateAccessToken: (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_KEY), // ❌ tidak ada { expiresIn }!
generateRefreshToken: (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_KEY), // ❌ tidak ada { expiresIn }!
```
**Akibat serius:** Access Token **tidak akan pernah expired** — sekali bocor, token bisa dipakai selamanya. Ini adalah celah keamanan besar.

---

#### 5. `predict.js` menggunakan URL hardcoded `0.0.0.0`
**File:** `utils/predict.js` baris 4
```js
baseURL: 'http://0.0.0.0:8000',
```
`0.0.0.0` adalah wildcard interface, bukan address valid untuk request HTTP dari klien. Seharusnya `http://127.0.0.1:8000` atau dari environment variable.

---

### 🟡 PERINGATAN SEDANG

#### 6. `guard.js` tidak di-export
**File:** `src/middleware/guard.js` baris 22
File berakhir tanpa `export default permissionGuard;`. Middleware RBAC ini tidak bisa digunakan, meskipun tabel permission sudah disiapkan.

---

#### 7. `addUser` menerima parameter yang tidak digunakan
**File:** `user-repositories.js` baris 10
```js
async addUser({ fullName, username, birthDate, email, password }) {
  // username dan birthDate tidak pernah dipakai dalam query!
```
Destrukturisasi mengambil `username` dan `birthDate` tetapi tidak diinsert ke DB dan tidak ada di validator. Ini sisa kode lama.

---

#### 8. `console.log` debug tersisa di production code
**File:** `user-repositories.js` baris 64
```js
console.log('User ID yang ditemukan:', id);
```
**File:** `token-manager.js` baris 14 & 23
```js
console.log(error);
```
Ini membocorkan informasi sensitif ke log server dan harus dihapus sebelum production.

---

#### 9. Secret key JWT terbuka di `.env` tanpa `.env.example`
File `.env` langsung berisi nilai `ACCESS_TOKEN_KEY` dan `REFRESH_TOKEN_KEY` yang panjang, tetapi tidak ada file `.env.example` sebagai template. Ini berisiko jika `.gitignore` tidak terkonfigurasi dengan benar.

---

#### 10. Respons tidak konsisten antara controller
Beberapa controller menggunakan helper `response()`:
```js
return response(res, 200, 'message', data);
```
Tapi `getHistoriesScreeningByUserId` dan `getDetailScreeningById` langsung menggunakan `res.status(200).json({...})` secara manual dengan format yang berbeda (tidak ada field `code`). Ini membuat response API tidak konsisten.

---

#### 11. `detailScreeningById` tidak handle jika data tidak ditemukan
**File:** `medical-records-repositories.js` baris 152
```js
return rows[0]; // bisa return undefined jika screeningId tidak ada!
```
Controller tidak memvalidasi jika `row` adalah `undefined`, sehingga akan error saat mencoba akses `row.age`, dll.

---

### 🟢 SARAN PERBAIKAN MINOR

#### 12. Tidak ada CORS middleware
Jika frontend di-host di domain berbeda (misal: React/Flutter Web), request akan diblokir browser karena tidak ada `cors` middleware.

#### 13. Tidak ada rate limiting
Endpoint `/api/auth/login` rentan terhadap brute force attack. Gunakan package `express-rate-limit`.

#### 14. Tidak ada test sama sekali
`package.json` menunjukkan `"test": "echo \"Error: no test specified\""`. Tidak ada unit test maupun integration test.

#### 15. `cholesterolLevel` dan `glucoseLevel` tidak dibatasi valid(1,2,3)
Validator hanya memvalidasi `min(0)` padahal mapping hanya ada untuk nilai `1`, `2`, `3`. Nilai `0` atau `4+` akan return `undefined` dari mapping.

---

## 📊 Ringkasan Temuan

| Tingkat | Jumlah | Kategori |
|---------|--------|---------|
| 🔴 Kritis | 5 | Security, crash risk |
| 🟡 Sedang | 7 | Bugs, inkonsistensi |
| 🟢 Minor | 4 | Best practice |
| **Total** | **16** | |

---

## 🎯 Prioritas Perbaikan

1. **Tambahkan `expiresIn` ke JWT** (keamanan kritis)
2. **Perbaiki `gender` validator** (bug fungsional)
3. **Tambahkan `try/catch` ke `refreshToken` & `logout`** (crash prevention)
4. **Perbaiki URL `predict.js`** ke env variable
5. **Export `guard.js`** agar RBAC bisa digunakan
6. **Tambahkan `cors` dan `rate-limit`** middleware
7. **Bersihkan `console.log`** di production code
8. **Seragamkan format response** di semua controller
