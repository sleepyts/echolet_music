import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import SidebarFooter from "./components/sidebar-footer";
import { AudioWaveform, Settings } from "lucide-react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { MineContent } from "./components/content-mine";

export function AppSidebar() {
  const items = [
    {
      key: "recommend-for-me",
      title: t("sidebar.recommend-for-me"),
      url: "/home",
      icon: AudioWaveform,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <MineContent />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
