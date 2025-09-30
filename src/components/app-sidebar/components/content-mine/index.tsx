import { PlaylistApis } from "@/apis/playlist";
import { UserInfoState } from "@/atoms/user-atoms";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { go } from "@/lib/utils";
import { useMount } from "ahooks";
import { t } from "i18next";
import { useAtomValue } from "jotai";
import { Heart, History } from "lucide-react";
import { useState } from "react";

export const MineContent = () => {
  const uid = useAtomValue(UserInfoState.accountUid);

  const [playlists, setPlaylists] = useState<any[]>([]);
  useMount(() => {
    PlaylistApis.getUserPlaylist(uid || 0).then((res: any) => {
      setPlaylists(res.playlist || []);
    });
  });
  return (
    <SidebarGroup>
      <SidebarSeparator />
      <SidebarGroupLabel>{t("sidebar.my")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => go(`/playlist/${playlists[0].id}`)}
            >
              <Heart />
              {t("sidebar.my-like")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <History />
              {t("recent-play")}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
