import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
const histories = [
  {
    id: '1',
    date: '24 Okt 2024',
    time: '14:20 WIB',
    pressure: '120/80 mmHg',
    category: 'Normal',
    probability: '12%',
  },
  {
    id: '2',
    date: '12 Okt 2024',
    time: '09:15 WIB',
    pressure: '135/90 mmHg',
    category: 'Risiko Rendah',
    probability: '34%',
  },
  {
    id: '3',
    date: '01 Sep 2024',
    time: '16:45 WIB',
    pressure: '150/95 mmHg',
    category: 'Risiko Tinggi',
    probability: '78%',
  },
];

const filters = ['Semua', 'Normal', 'Risiko Rendah', 'Risiko Tinggi'];

export default function ScreeningHistoryPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filteredHistories = useMemo(() => {
    return histories.filter((item) => {
      const matchSearch =
        item.date.toLowerCase().includes(search.toLowerCase()) ||
        item.pressure.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        activeFilter === 'Semua' || item.category === activeFilter;

      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  return (
    <MainLayout title="Riwayat Skrining">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari berdasarkan tanggal..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    activeFilter === item
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-8 py-5 font-bold">Tanggal</th>
                  <th className="px-8 py-5 font-bold">Tekanan Darah</th>
                  <th className="px-8 py-5 font-bold">Kategori Risiko</th>
                  <th className="px-8 py-5 font-bold">Probabilitas</th>
                  <th className="px-8 py-5 font-bold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredHistories.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-8 py-5">
                      <p className="font-medium text-gray-900">{item.date}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </td>

                    <td className="px-8 py-5 text-gray-700">{item.pressure}</td>

                    <td className="px-8 py-5">
                      <RiskBadge category={item.category} />
                    </td>

                    <td className="px-8 py-5 font-medium text-gray-700">
                      {item.probability}
                    </td>

                    <td className="px-8 py-5">
                      <Link
                        to={`/screening/result/${item.id}`}
                        className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-8 py-4">
            <p className="text-sm text-gray-500">
              Menampilkan {filteredHistories.length} dari {histories.length}{' '}
              data
            </p>

            <div className="flex gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border text-gray-400 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border text-gray-400 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Bagaimana cara menjaga kesehatan jantung?
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Pelajari langkah-langkah sederhana untuk meningkatkan kebugaran
              kardiovaskular Anda hari ini.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline">
              Baca Artikel Lengkap
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-blue-50 p-8 shadow-sm">
            <div className="relative z-10">
              <span className="rounded-full bg-blue-700 px-4 py-1 text-xs font-bold text-white">
                Tips Diet
              </span>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Menu Sehat Jantung
              </h3>
            </div>

            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-emerald-200 opacity-70" />
            <div className="absolute bottom-0 right-6 h-20 w-20 rounded-full bg-lime-200 opacity-70" />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function RiskBadge({ category }) {
  const styles = {
    Normal: 'bg-emerald-100 text-emerald-700',
    'Risiko Rendah': 'bg-blue-100 text-blue-700',
    'Risiko Tinggi': 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[category] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {category}
    </span>
  );
}
