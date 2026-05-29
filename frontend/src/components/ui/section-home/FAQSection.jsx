import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apakah CardioCare gratis digunakan?",
    answer:
      "Ya, fitur skrining dasar dapat digunakan secara gratis untuk membantu pengguna memahami risiko kesehatan jantung secara mandiri.",
  },
  {
    question: "Apakah hasil AI menggantikan diagnosis dokter?",
    answer:
      "Tidak. Hasil analisis CardioCare hanya bersifat pendukung awal dan bukan pengganti pemeriksaan langsung oleh tenaga medis.",
  },
  {
    question: "Data kesehatan saya aman?",
    answer:
      "Data pengguna dikelola dengan sistem autentikasi dan perlindungan keamanan agar informasi kesehatan tetap terjaga.",
  },
  {
    question: "Parameter apa saja yang dianalisis?",
    answer:
      "Sistem menganalisis data seperti usia, tekanan darah, kolesterol, glukosa, berat badan, serta gaya hidup pengguna.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-700">
            FAQ
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p className="text-gray-500 mt-3">
            Temukan jawaban singkat seputar penggunaan CardioCare.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-gray-900">
                  {item.question}
                </h3>

                <ChevronDown size={20} className="text-gray-400" />
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-700 rounded-3xl px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Mulai Pantau Kesehatan Jantung Anda Hari Ini
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Bergabunglah bersama CardioCare untuk memahami risiko kesehatan jantung secara lebih mudah, cepat, dan terarah.
          </p>

          <a
            href="/register"
            className="inline-flex bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Daftar Gratis
          </a>
        </div>
      </div>
    </section>
  );
}