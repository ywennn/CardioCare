import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center">
                <HeartPulse size={20} />
              </div>
              <h2 className="text-xl font-bold">CardioCare</h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Platform kesehatan digital berbasis AI untuk membantu memantau
              risiko penyakit kardiovaskular secara mandiri.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#beranda" className="hover:text-white">Beranda</a></li>
              <li><a href="#fitur" className="hover:text-white">Fitur</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Fitur</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Skrining Risiko</li>
              <li>Hasil Prediksi AI</li>
              <li>Riwayat Pemeriksaan</li>
              <li>Monitoring Kesehatan</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Email: - </li>
              <li>Indonesia</li>
              <li>Health AI Platform</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 CardioCare. All rights reserved.</p>
          <p>Built for cardiovascular health monitoring.</p>
        </div>
      </div>
    </footer>
  );
}