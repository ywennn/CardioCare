import { Link } from 'react-router-dom';
import { HeartPulse, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6">
      <div className="max-w-xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-700 text-white shadow-xl">
          <HeartPulse size={46} />
        </div>

        <h1 className="mt-8 text-7xl font-extrabold text-blue-700">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mt-4 text-gray-500">
          Sepertinya halaman yang Anda cari tidak tersedia atau telah
          dipindahkan. Mari kembali ke halaman utama CardioCare.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-800"
          >
            <Home size={18} />
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Halaman Sebelumnya
          </button>
        </div>

        <div className="mt-12 rounded-2xl border border-blue-100 bg-white/80 p-5 text-sm text-gray-500 shadow-sm">
          CardioCare AI Health Platform • Monitoring kesehatan jantung berbasis AI
        </div>
      </div>
    </div>
  );
}