import { NavMain } from '@/components/nav-main';
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shrink-0">
                  <HeartPulseIcon size={20} />
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
        <div className="px-3 py-2 group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-slate-400 text-center whitespace-nowrap">
            © {new Date().getFullYear()} CardioCare
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
