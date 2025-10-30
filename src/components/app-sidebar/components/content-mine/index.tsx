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
import { useMount } from "ahooks";
import { t } from "i18next";
import { useAtom, useAtomValue } from "jotai";
import { Heart, History } from "lucide-react";
import { UserPlaylistState } from "@/atoms/playlist-atoms";
import { RouteUtils } from "@/lib/utils";
import { MyPlaylist } from "./my-playlist";

export const MineContent = () => {
  const uid = useAtomValue(UserInfoState.accountUid);

  const [playlists, setPlaylists] = useAtom(UserPlaylistState.userPlaylist);
  useMount(() => {
    PlaylistApis.getUserPlaylist(uid || 0).then((res: any) => {
      setPlaylists(res.playlist || []);

      console.log(res);
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
              onClick={() => RouteUtils.go(`/playlist/${playlists[0].id}`)}
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
