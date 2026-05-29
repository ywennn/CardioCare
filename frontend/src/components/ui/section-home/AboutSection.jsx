import {
  HeartPulse,
  Droplets,
  Activity,
  ClipboardCheck,
} from "lucide-react";

const monitoringItems = [
  {
    title: "Tekanan Darah & Kolesterol",
    desc: "Input berkala hasil tes untuk melihat tren jangka panjang.",
    icon: HeartPulse,
  },
  {
    title: "Glukosa & Pola Makan",
    desc: "Catat asupan gula dan kebiasaan diet harian Anda.",
    icon: Droplets,
  },
  {
    title: "Gaya Hidup",
    desc: "Pantau aktivitas fisik dan tingkat stres secara teratur.",
    icon: Activity,
  },
  {
    title: "Rekomendasi",
    desc: "Dapatkan tips spesifik berdasarkan profil kesehatan Anda.",
    icon: ClipboardCheck,
  },
];

export default function AboutSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1200&auto=format&fit=crop"
            alt="Health monitoring"
            className="rounded-3xl shadow-xl w-full"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-5">
            Monitoring Kesehatan yang Menyeluruh
          </h2>

          <p className="text-gray-500 leading-relaxed mb-8">
            CardioCare membantu Anda memantau parameter krusial kesehatan jantung tanpa perlu alat medis rumit di rumah setiap saat.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {monitoringItems.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <item.icon size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}