import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboardIcon,
  HeartPulseIcon,
  ClipboardListIcon,
  UserIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
const navItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    exact: true,
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    label: 'Skrining',
    to: '/screening',
    exact: true,
    icon: <HeartPulseIcon size={18} />,
  },
  {
    label: 'Riwayat',
    to: '/history',
    exact: false,
    icon: <ClipboardListIcon size={18} />,
  },
  {
    label: 'Profil',
    to: '/profile',
    exact: false,
    icon: <UserIcon size={18} />,
  },
];

export function AppSidebar({ ...props }) {
  const { user, logout } = useAuth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-sm text-blue-950">
                    Cardio<span className="text-blue-600">Care</span>
                  </span>
                  <span className="text-xs text-slate-400">Health Monitor</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
