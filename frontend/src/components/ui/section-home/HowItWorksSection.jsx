const steps = [
  {
    number: '01',
    title: 'Daftar Akun',
    desc: 'Buat akun gratis hanya dengan email dan password. Tidak perlu kartu kredit.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Isi Data Klinis',
    desc: 'Masukkan data seperti usia, tekanan darah, kolesterol, gula darah, dan informasi kesehatan lainnya.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'AI Menganalisis',
    desc: 'Model machine learning kami memproses data dan menghitung probabilitas risiko penyakit jantung.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Terima Hasil & Rekomendasi',
    desc: 'Dapatkan laporan lengkap: kategori risiko, faktor utama, dan rekomendasi gaya hidup yang personal.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="text-xs font-medium text-blue-600">
              Cara Kerja
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Mulai dalam 4 Langkah Mudah
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Proses skrining yang sederhana dan mudah dipahami oleh siapa saja
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-px bg-blue-100 z-0" />
              )}
              {/* Icon */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-blue-400">
                {step.number}
              </div>
              <h3 className="font-semibold text-slate-800">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
