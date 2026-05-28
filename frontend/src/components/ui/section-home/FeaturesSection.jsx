const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Skrining Cepat',
    desc: 'Proses skrining selesai dalam hitungan menit. Cukup isi data klinis dan dapatkan hasil analisis instan.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Privasi Terjaga',
    desc: 'Data kesehatan kamu dienkripsi dan tidak dibagikan ke pihak ketiga manapun.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
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
    title: 'Monitoring Jangka Panjang',
    desc: 'Pantau tren kesehatan jantungmu dari waktu ke waktu dengan grafik dan riwayat skrining lengkap.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Rekomendasi Personal',
    desc: 'Dapatkan saran kesehatan yang disesuaikan dengan profil risikomu berdasarkan analisis AI.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Akses Multi-Device',
    desc: 'Gunakan CardioCare di browser manapun — desktop, tablet, maupun smartphone.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: '100% Gratis',
    desc: 'Semua fitur skrining dan monitoring tersedia gratis. Tidak ada biaya tersembunyi.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="text-xs font-medium text-blue-600">
              Keunggulan
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Mengapa Memilih CardioCare?
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Dirancang untuk kemudahan dan akurasi — bantu kamu memahami kondisi
            jantung dengan lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md hover:border-blue-100 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
