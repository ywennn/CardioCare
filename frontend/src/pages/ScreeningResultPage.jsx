import { Link, useParams } from 'react-router-dom';
import {
  Download,
  Share2,
  Cigarette,
  Wine,
  Activity,
  Brain,
  Utensils,
  Moon,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';
import { useExportScreening, useScreeningDetail } from '@/hooks/screening-hook';
import MainLayout from '@/components/layout/MainLayout';

export default function ScreeningResultPage() {
  const { screeningId } = useParams();
  const { data, isLoading, isError, error } = useScreeningDetail(screeningId);
  const { mutate: exportPdf, isPending: isExporting } = useExportScreening();
  if (isLoading) {
    return (
      <MainLayout title="Hasil Analisis AI">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Memuat hasil skrining...</p>
        </div>
      </MainLayout>
    );
  }

  if (isError || !data) {
    return (
      <MainLayout title="Hasil Analisis AI">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">
            Gagal memuat data skrining. {error.response?.data?.message}
          </p>
        </div>
      </MainLayout>
    );
  }

  console.log(data);
  const result = data?.data?.data;
  const isHighRisk = result?.ai_result?.category === 'BERISIKO TINGGI';
  const probability = Math.round((result?.ai_result?.probability ?? 0) * 100);

  const recordedAt = result?.recorded_at
    ? new Date(result.recorded_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

  return (
    <MainLayout title="Hasil Analisis AI">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hasil Analisis AI
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Diproses pada {recordedAt}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              <Share2 size={16} />
              Bagikan
            </button>
            <button
              onClick={() => exportPdf(screeningId)}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              <Download size={16} />
              {isExporting ? 'Mengunduh...' : 'PDF'}
            </button>
          </div>
        </div>

        {/* Probabilitas + Metric */}
        <section className="grid gap-6 lg:grid-cols-4">
          <div
            className={`rounded-3xl border p-8 shadow-sm lg:col-span-3 ${isHighRisk ? 'bg-red-50' : 'bg-emerald-50'}`}
          >
            <div
              className={`mb-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${isHighRisk ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}
            >
              Kategori: {result?.ai_result?.category}
            </div>

            <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
              <div
                className={`flex h-44 w-44 items-center justify-center rounded-full border-[12px] bg-white ${isHighRisk ? 'border-red-500' : 'border-emerald-600'}`}
              >
                <div className="text-center">
                  <p
                    className={`text-5xl font-bold ${isHighRisk ? 'text-red-600' : 'text-emerald-700'}`}
                  >
                    {probability}%
                  </p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    PROBABILITAS
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isHighRisk
                    ? 'Perhatian! Risiko Jantung Terdeteksi.'
                    : 'Selamat! Jantung Anda dalam Kondisi Prima.'}
                </h2>
                <p className="mt-3 max-w-xl text-gray-600">
                  {result?.recommendations?.general}
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
            <MetricCard
              title="Tekanan Darah"
              value={result?.patient_vitals?.blood_pressure}
              unit="mmHg"
            />
            <MetricCard
              title="Kolesterol"
              value={result?.patient_vitals?.cholesterol_level}
              unit=""
            />
            <MetricCard
              title="BMI"
              value={result?.patient_vitals?.bmi}
              unit={result?.patient_vitals?.bmi_category}
            />
            <MetricCard
              title="Glukosa"
              value={result?.patient_vitals?.glucose_level}
              unit=""
            />
          </div>
        </section>

        {/* Gaya Hidup + Faktor Risiko */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-gray-900">
              Ringkasan Gaya Hidup
            </h2>
            <LifestyleItem
              icon={Cigarette}
              label="Perokok"
              value={result?.patient_vitals?.lifestyle?.smoking}
            />
            <LifestyleItem
              icon={Wine}
              label="Alkohol"
              value={result?.patient_vitals?.lifestyle?.alcohol}
            />
            <LifestyleItem
              icon={Activity}
              label="Aktivitas Fisik"
              value={result?.patient_vitals?.lifestyle?.active_exercise}
            />
          </div>

          <div
            className={`rounded-2xl border p-6 shadow-sm ${isHighRisk ? 'bg-red-50' : 'bg-emerald-50'}`}
          >
            <h2 className="mb-5 font-bold text-gray-900">Faktor Risiko</h2>
            {result?.ai_result?.risk_factors?.length > 0 ? (
              <ul className="space-y-2">
                {result.ai_result.risk_factors.map((factor, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <AlertTriangle
                      size={16}
                      className="mt-0.5 shrink-0 text-red-500"
                    />
                    {factor}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Tidak ada faktor risiko signifikan terdeteksi.
              </p>
            )}
          </div>
        </section>

        {/* Rekomendasi + Tips */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-blue-700 p-7 text-white shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Brain size={22} />
              <h2 className="text-xl font-bold">Rekomendasi Ahli AI</h2>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-blue-50">
              {result?.recommendations?.ai_expert?.map((item, i) => (
                <li key={i}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gray-100 p-7 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Tips Pola Hidup
            </h2>
            <TipItem
              icon={Utensils}
              title="Diet DASH"
              desc="Fokus pada sayuran, buah-buahan, dan protein tanpa lemak."
            />
            <TipItem
              icon={Moon}
              title="Kualitas Tidur"
              desc="Pastikan tidur 7–8 jam untuk membantu pemulihan jantung."
            />
          </div>
        </section>

        {/* Navigasi */}
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
    </MainLayout>
  );
}

function MetricCard({ title, value, unit }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-gray-900">{value ?? '-'}</h3>
      {unit && <p className="text-sm text-gray-400">{unit}</p>}
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
      <span className="font-semibold text-blue-700">{value ?? '-'}</span>
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
