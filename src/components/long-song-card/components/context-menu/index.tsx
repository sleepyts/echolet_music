import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { FC, PropsWithChildren } from "react";
import { LongSongCardContextMenuGroup1 } from "./menu-group1";
import { LongSongCardContextMenuGroup2 } from "./menu-group2";

interface LongSongCardContextMenuProps {
  track: any;
  playlistIds: number[];
}
export const LongSongCardContextMenu: FC<
  PropsWithChildren<LongSongCardContextMenuProps>
> = ({ track, playlistIds, children }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-fit h-fit relative">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <LongSongCardContextMenuGroup1
          track={track}
          playlistIds={playlistIds}
        />
        <ContextMenuSeparator />
        <LongSongCardContextMenuGroup2 />
      </ContextMenuContent>
    </ContextMenu>
  );
};
