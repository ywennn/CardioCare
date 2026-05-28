import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export function NavMain({ items }) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === item.to ||
                  (item.to !== '/dashboard' && pathname.startsWith(item.to))
                }
                tooltip={item.label}
              >
                <Link to={item.to} className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
