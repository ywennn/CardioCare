import {
  HeartPulse,
  Brain,
  History,
  Activity,
  BookOpen,
  Bell,
} from "lucide-react";

const features = [
  {
    title: "Skrining",
    desc: "Lakukan penilaian mandiri risiko kesehatan jantung dengan parameter medis yang valid.",
    icon: HeartPulse,
  },
  {
    title: "Hasil AI",
    desc: "Dapatkan analisis mendalam berbasis AI yang mengolah data kesehatan Anda.",
    icon: Brain,
  },
  {
    title: "Riwayat",
    desc: "Pantau perkembangan kesehatan Anda dari waktu ke waktu dengan pencatatan riwayat.",
    icon: History,
  },
  {
    title: "Monitoring",
    desc: "Visualisasi tren tekanan darah, kolesterol, dan glukosa dalam grafik yang mudah dipahami.",
    icon: Activity,
  },
  {
    title: "Artikel",
    desc: "Kumpulan konten edukasi kesehatan jantung yang divalidasi oleh tim medis kami.",
    icon: BookOpen,
  },
  {
    title: "Notifikasi",
    desc: "Pengingat pintar untuk jadwal pemeriksaan rutin dan pola hidup sehat setiap harinya.",
    icon: Bell,
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Fitur Lengkap Untuk Anda
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Dirancang untuk memudahkan monitoring kesehatan jantung harian secara akurat dan efisien.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-md transition"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
  <item.icon size={22} />
</div>

              <h3 className="font-bold text-xl text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}