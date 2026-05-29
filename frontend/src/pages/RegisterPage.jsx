import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, HeartPulse } from "lucide-react";
import api from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/register", {
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registrasi gagal. Periksa kembali data Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-blue-300 opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-300 opacity-30 blur-3xl" />

      <div className="relative z-10 mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg">
          <HeartPulse size={28} />
        </div>
        <span className="text-3xl font-bold text-blue-700">CardioCare</span>
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Buat Akun Baru
          </h1>
          <p className="mt-2 text-gray-500">
            Mulai perjalanan kesehatan jantung kamu bersama CardioCare.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Nama Lengkap
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Masukkan username"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="contoh@email.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 karakter"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        <div className="my-7 border-t border-gray-200" />

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </section>

      <p className="relative z-10 mt-8 text-xs text-gray-400">
        © 2026 CardioCare. All rights reserved.
      </p>
    </main>
  );
}