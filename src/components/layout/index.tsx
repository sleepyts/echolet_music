import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { navigatorRef } from "@/lib/utils";
import { AppHeader } from "../app-header/indext";
export const Layout = () => {
  const navigate = useNavigate();
  navigatorRef.current = navigate;

  return (
    <SidebarProvider open>
      <AppSidebar />
      <main className="p-4 w-full flex flex-col h-screen">
        <AppHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
