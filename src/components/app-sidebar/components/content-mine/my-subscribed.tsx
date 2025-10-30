import { UserPlaylistState } from "@/atoms/playlist-atoms";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "@/hooks/use-pathname";
import { RouteUtils } from "@/lib/utils";
import { t } from "i18next";
import { useAtomValue } from "jotai";
import { ChevronDown } from "lucide-react";

export function MySubscribedPlaylist() {
  const playlists = useAtomValue(UserPlaylistState.userSubscribedPlaylist);
  const pathname = usePathname();

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel>
                <span>{t("sidebar.my-subscribed-playlist")}</span>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
        <CollapsibleContent>
          <SidebarGroupContent>
            {playlists.map((item) => (
              <SidebarMenuButton
                isActive={pathname == `/playlist/${item?.id}`}
                className="mt-[6px]"
                title={item.name}
                onClick={() => {
                  RouteUtils.go(`/playlist/${item.id}`);
                }}
              >
                <Avatar className="rounded-[2px]">
                  <AvatarImage src={`${item.coverImgUrl}?param=24y24`} />
                </Avatar>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.name}
                </span>
              </SidebarMenuButton>
            ))}
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
