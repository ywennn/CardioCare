import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../button';
export default function NavActions() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="hidden md:flex items-center gap-2">
      {isAuthenticated ? (
        <>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all duration-150"
          >
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-150 cursor-pointer"
          >
            Keluar
          </button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            asChild
            className={`text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 `}
          >
            <Link to="/login">Masuk</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className={`text-white bg-blue-600 hover:bg-blue-700 hover:text-white transition-all duration-150 `}
          >
            <Link to="/register">Daftar Gratis</Link>
          </Button>
        </>
      )}
    </div>
  );
}
