import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { navigatorRef } from "@/lib/utils";
import { AppHeader } from "../app-header/indext";
import { BottomPlayer } from "../bottom-player";
import { APP_CONSTANTS } from "@/lib/consts";
import { Toaster } from "sonner";
export const Layout = () => {
  const navigate = useNavigate();

  // ts-ignore 忽略 navigatorRef.current 只读属性
  navigatorRef.current = navigate;

  return (
    <>
      <Toaster className="w-screen h-screen" />
      <SidebarProvider open className="justify-between">
        <AppSidebar />
        <main className="w-full flex flex-col h-screen overflow-auto">
          <nav>
            <AppHeader />
          </nav>
          <div
            className="overflow-y-auto scrollbar-hide p-4 flex-1"
            id={APP_CONSTANTS.APP_MAIN_CONTAINER_ID}
          >
            <Outlet />
          </div>
          <BottomPlayer />
        </main>
      </SidebarProvider>
    </>
  );
};
