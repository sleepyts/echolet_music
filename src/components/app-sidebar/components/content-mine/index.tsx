import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { t } from "i18next";
import { Heart, History } from "lucide-react";
import { RouteUtils } from "@/lib/utils";
import { UserPlaylistState } from "@/atoms/playlist-atoms";
import { useAtomValue } from "jotai";
import { usePathname } from "@/hooks/use-pathname";

export const MineContent = () => {
  const likePlaylist = useAtomValue(UserPlaylistState.userLikePlaylist);
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarSeparator />
      <SidebarGroupLabel>{t("sidebar.my")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => RouteUtils.go(`/playlist/${likePlaylist.id}`)}
              isActive={pathname == `/playlist/${likePlaylist?.id}`}
            >
              <Heart className="size-[12px]" />
              {t("sidebar.my-like")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <History className="size-[12px]" />
              {t("recent-play")}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
