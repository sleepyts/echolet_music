import { TrackState } from "@/atoms/track-atoms";
import {
  ContextMenuGroup,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { t } from "i18next";
import { useSetAtom } from "jotai";
import { PlayIcon, RotateCwSquareIcon } from "lucide-react";

interface IProps {
  track: any;
  playlistIds: number[];
}
export const LongSongCardContextMenuGroup1 = ({
  track,
  playlistIds,
}: IProps) => {
  const play = useSetAtom(TrackState.StartPlay);
  return (
    <ContextMenuGroup>
      <ContextMenuItem onClick={() => play(track, playlistIds)}>
        <PlayIcon />
        {t("play-track")}
      </ContextMenuItem>
      <ContextMenuItem onClick={() => play(track, playlistIds)}>
        <RotateCwSquareIcon />
        {t("play-next-track")}
      </ContextMenuItem>
    </ContextMenuGroup>
  );
};
