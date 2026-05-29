import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="bg-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left */}
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm mb-6">
            Deteksi Risiko Jantung Berbasis AI
          </div>

          <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-6">
            Jaga Kesehatan Jantung
            <span className="text-blue-700"> Lebih Cerdas</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Platform kesehatan digital yang membantu Anda memantau risiko penyakit kardiovaskular secara mandiri dengan teknologi kecerdasan buatan terpercaya.
          </p>

          <div className="flex gap-4 mb-8">
            <Link
            to="/login"
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-800 transition"
          >
          Mulai Skrining Gratis
          </Link>
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <span>Gratis</span>
            <span>Data Aman</span>
            <span>Hasil Cepat</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
            alt="Medical Dashboard"
            className="rounded-3xl shadow-2xl w-full max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}