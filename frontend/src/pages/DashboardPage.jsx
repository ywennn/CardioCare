import {
  Activity,
  HeartPulse,
  FileText,
  TrendingUp,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const histories = [
  {
    date: '24 Okt 2024, 09:15',
    pressure: '120/80 mmHg',
    risk: 'Rendah',
    probability: '5.2%',
  },
  {
    date: '18 Okt 2024, 14:30',
    pressure: '135/90 mmHg',
    risk: 'Sedang',
    probability: '15.8%',
  },
];

const articles = [
  {
    title: '5 Makanan Menjaga Jantung Tetap Sehat',
    category: 'Edukasi Kesehatan',
  },
  {
    title: 'Olahraga Ringan untuk Penderita Hipertensi',
    category: 'Gaya Hidup',
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="space-y-6">
        <section className="rounded-3xl bg-blue-700 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Halo, Andi Pratama</h1>
              <p className="mt-2 max-w-xl text-blue-100">
                Pantau kesehatan jantungmu secara berkala untuk masa depan yang
                lebih sehat dan bahagia.
              </p>

              <Link
                to="/screening"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                <Activity size={18} />
                Mulai Skrining
              </Link>
            </div>

            <div className="hidden rounded-2xl bg-white/15 p-6 md:block">
              <HeartPulse size={96} className="text-white/70" />
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <FileText size={20} />
            </div>
            <p className="text-xs font-semibold uppercase text-gray-400">
              Total Skrining
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">2 Sesi</h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={20} />
            </div>
            <p className="text-xs font-semibold uppercase text-gray-400">
              Rata-rata Risiko
            </p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-600">12.5%</h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-gray-400">
                Risiko Terbaru
              </p>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Rendah
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Normal (Safe Zone)
            </h2>
            <div className="mt-5 h-2 rounded-full bg-gray-100">
              <div className="h-2 w-[18%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-right text-xs text-gray-400">
              18% Probability
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900">
                  Tren Kesehatan Jantung
                </h2>
                <p className="text-sm text-gray-400">
                  Statistik 7 hari terakhir
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-gray-100 px-3 py-1 text-xs">
                  7D
                </button>
                <button className="rounded-lg px-3 py-1 text-xs text-gray-400">
                  30D
                </button>
              </div>
            </div>

            <div className="flex h-56 items-end gap-5">
              {[35, 55, 28, 75, 42, 18, 48].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className={`w-full rounded-t-xl ${
                      index === 6 ? 'bg-blue-700' : 'bg-blue-200'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs font-medium text-gray-400">
                    {['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-gray-900">Artikel Pilihan</h2>

            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.title} className="flex gap-3">
                  <div className="h-16 w-16 rounded-xl bg-blue-50" />
                  <div>
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {article.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Lihat Semua Artikel
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h2 className="font-bold text-gray-900">
              Riwayat Skrining Terbaru
            </h2>
            <button className="text-sm font-semibold text-blue-700">
              Unduh Laporan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Tanggal</th>
                  <th className="px-6 py-4 font-medium">Tekanan Darah</th>
                  <th className="px-6 py-4 font-medium">Kategori Risiko</th>
                  <th className="px-6 py-4 font-medium">Probabilitas</th>
                  <th className="px-6 py-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((item) => (
                  <tr key={item.date} className="border-t">
                    <td className="px-6 py-4 text-gray-700">{item.date}</td>
                    <td className="px-6 py-4 text-gray-700">{item.pressure}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.risk === 'Rendah'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {item.probability}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-500 hover:text-blue-700">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-dashed bg-white p-12 text-center">
          <HeartPulse className="mx-auto text-gray-300" size={54} />
          <h2 className="mt-4 text-xl font-bold text-gray-400">
            Belum ada data mendalam
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Lakukan skrining setidaknya seminggu sekali untuk mendapatkan
            analisis tren kesehatan jantung yang lebih akurat.
          </p>
          <Link
            to="/screening"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Mulai Sekarang
          </Link>
        </section>
      </div>
    </main>
  );
}