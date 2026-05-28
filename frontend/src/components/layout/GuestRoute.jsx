import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500 text-sm">Memuat...</span>
      </div>
    );
  }
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
