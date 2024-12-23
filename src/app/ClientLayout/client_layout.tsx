"use client";
import HeaderComponent from '@/Components/Header/Header';
import SidebarComponent from '@/Components/Sidebar/Sidebar';
import { usePathname } from 'next/navigation';
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isRestrictedPage =
    pathname === '/' ||
    pathname === '/Auth/Login' ||
    pathname === '/Auth/Register' ||
    pathname === '/ForgotPassword' ||
    pathname === '/Password';
  return (
    <div className="flex h-screen">
      {/* SideNavbar */}
      {!isRestrictedPage && (
        <aside className="fixed left-0 top-0 h-full z-10">
          <SidebarComponent />
        </aside>
      )}
      {/* Main Content Section */}
      <div className={`flex flex-1 flex-col ${!isRestrictedPage ? 'ml-64' : ''}`}>
        {/* Header */}
        {!isRestrictedPage && (
          <header className="fixed top-0  right-0 z-20 ">
            <HeaderComponent />
          </header>
        )}
        {/* Main Content */}
        <main
          className={`${!isRestrictedPage ? 'mt-16' : ''
            } flex-1 overflow-y-auto `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
export default ClientLayout;