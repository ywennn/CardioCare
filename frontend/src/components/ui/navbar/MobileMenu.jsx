import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../button';
const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Fitur', to: '/fitur' },
  { label: 'Tentang', to: '/tentang' },
];

export default function MobileMenu({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100
        ${isOpen ? 'max-h-96' : 'max-h-0'}`}
    >
      <div className="px-6 py-3 pb-5 flex flex-col gap-1">
        {/* Nav Links */}
        {links.map((link) => {
          const isActive = pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={`px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-150
                ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/60'
                }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="my-2 h-px bg-slate-100" />

        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              onClick={onClose}
              className="px-3 py-2.5 rounded-lg text-[15px] font-medium text-center text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all duration-150"
            >
              Dashboard
            </Link>
            <Button
              variant="outline"
              className={`bg-blue-600`}
              onClick={handleLogout}
            >
              Keluar
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={onClose}
              className="px-3 py-2.5 rounded-lg text-[15px] font-medium text-center text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all duration-150"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="px-3 py-2.5 rounded-lg text-[15px] font-medium text-center text-white bg-blue-600 hover:bg-blue-700 transition-all duration-150 block"
            >
              Daftar Gratis
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
