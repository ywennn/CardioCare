const stats = [
  {
    number: '17,9 Juta',
    label: 'Kematian per tahun akibat penyakit kardiovaskular di dunia',
    source: 'WHO, 2023',
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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    number: '651 Ribu',
    label: 'Kematian akibat penyakit jantung di Indonesia setiap tahun',
    source: 'Kemenkes RI, 2023',
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
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: '80%',
    label:
      'Kasus penyakit jantung dapat dicegah dengan deteksi dan gaya hidup sehat',
    source: 'American Heart Association',
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
  {
    number: '#1',
    label:
      'Penyebab kematian tertinggi di Indonesia adalah penyakit jantung koroner',
    source: 'Riskesdas 2018',
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section id="tentang" className="py-20 bg-blue-600">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Fakta Penyakit Kardiovaskular
          </h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            Data resmi yang perlu kamu ketahui tentang ancaman penyakit jantung
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white">{stat.number}</div>
              <p className="text-blue-100 text-sm leading-relaxed">
                {stat.label}
              </p>
              <span className="text-xs text-blue-200 mt-auto">
                Sumber: {stat.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
