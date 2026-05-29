import { Link, useLocation } from 'react-router-dom';
import {
  Download,
  Share2,
  HeartPulse,
  Cigarette,
  Wine,
  Activity,
  Brain,
  Utensils,
  Moon,
  ArrowLeft,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ScreeningResultPage() {
  const location = useLocation();

  const result = location.state?.result || {
    probability: 12,
    category: 'Risiko Rendah / Sehat',
    riskLabel: 'Selamat! Jantung Anda dalam Kondisi Prima.',
    description:
      'Berdasarkan analisis algoritma cerdas kami, Anda memiliki profil risiko yang sangat rendah terhadap penyakit jantung.',
    systolicPressure: 118,
    cholesterolLevel: 190,
    bmi: 22.4,
    glucoseLevel: 92,
  };

  return (
    <DashboardLayout title="Hasil Analisis AI">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hasil Analisis AI
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Diproses pada 24 Mei 2024 · 14.30 WIB
            </p>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              <Share2 size={16} />
              Bagikan
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-4">
          <div className="rounded-3xl border bg-emerald-50 p-8 shadow-sm lg:col-span-3">
            <div className="mb-5 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Kategori: {result.category}
            </div>

            <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-emerald-600 bg-white">
                <div className="text-center">
                  <p className="text-5xl font-bold text-emerald-700">
                    {result.probability}%
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    PROBABILITAS
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {result.riskLabel}
                </h2>
                <p className="mt-3 max-w-xl text-gray-600">
                  {result.description}
                </p>

                <div className="mt-5 rounded-2xl border-l-4 border-blue-700 bg-white p-4 text-sm text-gray-600">
                  Hasil ini merupakan skrining awal berbasis AI dan bukan
                  pengganti diagnosis medis. Tetap konsultasikan dengan tenaga
                  medis ahli.
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <MetricCard title="Tekanan Darah" value={result.systolicPressure} unit="mmHg" />
            <MetricCard title="Kolesterol" value={result.cholesterolLevel} unit="mg/dL" />
            <MetricCard title="BMI" value={result.bmi} unit="Ideal" />
            <MetricCard title="Glukosa" value={result.glucoseLevel} unit="mg/dL" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-gray-900">
              Ringkasan Gaya Hidup
            </h2>

            <LifestyleItem icon={Cigarette} label="Perokok" value="Tidak" />
            <LifestyleItem icon={Wine} label="Alkohol" value="Tidak" />
            <LifestyleItem icon={Activity} label="Aktivitas Fisik" value="Aktif" />
          </div>

          <div className="rounded-2xl border bg-emerald-50 p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-gray-900">Faktor Risiko</h2>

            <RiskBar label="Genetik & Usia" value="Risiko Rendah" width="25%" />
            <RiskBar label="Metabolik" value="Sangat Rendah" width="15%" />
            <RiskBar label="Lingkungan & Stres" value="Risiko Sedang" width="45%" />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-blue-700 p-7 text-white shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Brain size={22} />
              <h2 className="text-xl font-bold">Rekomendasi Ahli AI</h2>
            </div>

            <p className="text-blue-100">
              Meskipun profil Anda sangat sehat, kami menyarankan untuk tetap
              melakukan pemeriksaan tekanan darah mandiri secara berkala.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-blue-50">
              <li>✓ Pertahankan asupan natrium di bawah 2300mg/hari.</li>
              <li>✓ Lanjutkan aktivitas jalan kaki 150 menit/minggu.</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-gray-100 p-7 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Tips Pola Hidup
            </h2>

            <TipItem icon={Utensils} title="Diet DASH" desc="Fokus pada sayuran, buah-buahan, dan protein tanpa lemak." />
            <TipItem icon={Moon} title="Kualitas Tidur" desc="Pastikan tidur 7–8 jam untuk membantu pemulihan jantung." />
          </div>
        </section>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/screening"
            className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Skrining Lagi
          </Link>

          <Link
            to="/history"
            className="rounded-xl border px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Lihat Riwayat
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-500 hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, unit }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-400">{unit}</p>
    </div>
  );
}

function LifestyleItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-b-0">
      <div className="flex items-center gap-3 text-gray-600">
        <Icon size={18} />
        <span>{label}</span>
      </div>
      <span className="font-semibold text-blue-700">{value}</span>
    </div>
  );
}

function RiskBar({ label, value, width }) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white">
        <div className="h-2 rounded-full bg-emerald-500" style={{ width }} />
      </div>
    </div>
  );
}

function TipItem({ icon: Icon, title, desc }) {
  return (
    <div className="mb-4 rounded-2xl bg-white p-4">
      <div className="mb-1 flex items-center gap-2 font-bold text-gray-900">
        <Icon size={18} className="text-blue-700" />
        {title}
      </div>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}