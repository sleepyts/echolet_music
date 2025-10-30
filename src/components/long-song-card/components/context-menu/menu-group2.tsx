import { UserPlaylistState } from "@/atoms/playlist-atoms";
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { t } from "i18next";
import { useAtomValue } from "jotai";
import { HeartIcon, PlayIcon } from "lucide-react";

export const LongSongCardContextMenuGroup2 = () => {
  const userPlaylists = useAtomValue(UserPlaylistState.userPlaylist);
  return (
    <ContextMenuGroup>
      <ContextMenuItem>
        <div className="flex items-center gap-2">
          <HeartIcon />
          <span>{t("like")}</span>
        </div>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>
          {t("add-to-playlist")}
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          {userPlaylists.map((item) => (
            <ContextMenuItem key={item.id}>{item.name}</ContextMenuItem>
          ))}
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuGroup>
  );
};
