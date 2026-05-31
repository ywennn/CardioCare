import { AppSidebar } from '../app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbLink,
} from '../ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { NavUser } from '../nav-user';
const MainLayout = ({ children, breadcrumbs = [] }) => {
  const { user, logout } = useAuth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className=" border-slate-100 px-4 flex justify-between items-center">
          <div className="flex items-center shrink-0 gap-2 h-16">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 mt-6 " />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.to ? (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.to}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <NavUser user={user} logout={logout} />
          </div>
        </header>
        <main className="flex-1 p-6 bg-slate-50 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
