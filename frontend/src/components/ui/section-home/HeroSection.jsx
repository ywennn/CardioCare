import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-50 rounded-full opacity-60 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-medium text-blue-600">
            Deteksi Risiko Jantung Berbasis AI
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
          Jaga Kesehatan Jantung{' '}
          <span className="text-blue-600">Lebih Cerdas</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
          CardioCare menggunakan kecerdasan buatan untuk mendeteksi risiko
          penyakit jantung secara dini — akurat, cepat, dan mudah digunakan.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-150 shadow-md shadow-blue-200"
            >
              Ke Dashboard →
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-150 shadow-md shadow-blue-200"
              >
                Mulai Skrining Gratis →
              </Link>
              <Link
                to="/login"
                className="px-7 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all duration-150"
              >
                Masuk
              </Link>
            </>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Gratis & tanpa biaya
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Data tersimpan aman
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Hasil instan
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-xs text-slate-400">Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
