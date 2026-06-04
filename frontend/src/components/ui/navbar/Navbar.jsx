import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Menu */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-blue-700">CardioCare</h1>

          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#beranda" className="hover:text-blue-700">
              Beranda
            </a>

            <a href="#fitur" className="hover:text-blue-700">
              Fitur
            </a>

            <a href="#faq" className="hover:text-blue-700">
              FAQ
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-700 text-blue-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-50 transition"
              >
                Masuk
              </Link>

              <Link
                to="/register"
                className="bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition"
              >
                Daftar Gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
