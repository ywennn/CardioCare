const steps = [
  {
    number: "1",
    title: "Daftar",
    desc: "Buat akun dengan email Anda secara gratis dan cepat.",
  },
  {
    number: "2",
    title: "Isi Data",
    desc: "Masukkan indikator kesehatan seperti tekanan darah dan gaya hidup.",
  },
  {
    number: "3",
    title: "AI Analisis",
    desc: "Sistem AI akan menganalisis data Anda berdasarkan algoritma medis.",
  },
  {
    number: "4",
    title: "Lihat Hasil",
    desc: "Terima laporan risiko dan saran pola hidup sehat secara personal.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Cara Kerja CardioCare
          </h2>
          <p className="text-gray-500 mt-3">
            Mulai perjalanan sehat jantung Anda hanya dalam beberapa langkah mudah.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                {step.number}
              </div>

              <h3 className="font-bold text-gray-900 mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}