import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  HeartPulse,
  ClipboardList,
  BookOpen,
  Bell,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Skrining', to: '/screening', icon: HeartPulse },
  { label: 'Riwayat', to: '/history', icon: ClipboardList },
  { label: 'Artikel', to: '/articles', icon: BookOpen },
  { label: 'Notifikasi', to: '/notifications', icon: Bell },
  { label: 'Profil', to: '/profile', icon: User },
];

export default function DashboardLayout({ title = 'Dashboard', children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-60 border-r bg-white px-4 py-6 lg:flex lg:flex-col">
        <Link to="/dashboard" className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white">
            <HeartPulse size={20} />
          </div>
          <div>
            <h1 className="font-bold text-blue-700">CardioCare</h1>
            <p className="text-xs text-gray-400">Heart Health Monitor</p>
          </div>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-6">
          <h2 className="text-xl font-bold text-blue-700">{title}</h2>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:block">
              Halo, {user?.fullName || user?.username || 'User'}
            </span>
            
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition hover:bg-blue-200"
              title="Profil"
            > 
              <User size={18} />
            </Link>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] p-6">{children}</main>
      </div>
    </div>
  );
}