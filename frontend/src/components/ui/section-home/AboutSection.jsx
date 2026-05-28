export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 w-fit">
              <span className="text-xs font-medium text-blue-600">
                Tentang CardioCare
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              Teknologi AI untuk{' '}
              <span className="text-blue-600">Kesehatan Jantungmu</span>
            </h2>
            <p className="text-slate-500 leading-relaxed">
              CardioCare adalah platform skrining kesehatan jantung berbasis
              kecerdasan buatan yang dirancang untuk membantu kamu mendeteksi
              risiko penyakit kardiovaskular sejak dini — tanpa perlu ke rumah
              sakit.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Dengan memasukkan data klinis sederhana seperti tekanan darah,
              kolesterol, dan gaya hidup, model AI kami akan menganalisis dan
              memberikan hasil serta rekomendasi yang personal untukmu.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {[
                'Berbasis model machine learning terlatih',
                'Rekomendasi personal dari pakar kesehatan',
                'Riwayat skrining tersimpan untuk monitoring jangka panjang',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-blue-500"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    fill="currentColor"
                    opacity="0.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
            {/* Floating cards */}
            <div className="absolute top-4 right-4 bg-white border border-slate-100 rounded-xl shadow-sm px-4 py-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-slate-700">
                Akurasi Model 85%+
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-white border border-slate-100 rounded-xl shadow-sm px-4 py-3 flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span className="text-xs font-medium text-slate-700">
                Hasil Real-time
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
