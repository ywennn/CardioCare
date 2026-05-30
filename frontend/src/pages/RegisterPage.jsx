import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, HeartPulse } from 'lucide-react';
import { useRegister } from '@/hooks/register-hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validation/auth-validation';
export default function RegisterPage() {
  const { mutate, isPending, isError, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    mutate(data);
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
          <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
          <p className="mt-2 text-gray-500">
            Mulai perjalanan kesehatan jantung kamu bersama CardioCare.
          </p>
        </div>

        {isError && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.response.data.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Nama Lengkap
            </label>
            <input
              name="fullName"
              type="text"
              {...register('fullName')}
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              name="userName"
              {...register('userName')}
              type="text"
              placeholder="Masukkan username"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {errors.userName && (
              <p className="text-xs text-red-500">{errors.userName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Email Address
            </label>
            <input
              name="email"
              {...register('email')}
              type="email"
              placeholder="contoh@email.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 karakter"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
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
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Ulangi password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
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
            disabled={isPending}
            className="w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="my-7 border-t border-gray-200" />

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{' '}
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
