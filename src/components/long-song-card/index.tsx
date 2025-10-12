import { fromMsToTimeString } from "@/lib/utils";
import { ArLink } from "../ar-link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import classNames from "classnames";

interface LongSongCardProps {
  track?: any;
  isLoading?: boolean;

  playlistIds?: number[];
}

export const LongSongCard = ({
  track,
  isLoading = false,
  playlistIds = [],
}: LongSongCardProps) => {
  const play = useSetAtom(TrackState.StartPlay);
  const currentTrackId = useAtomValue(TrackState.CurrentTrackId);

  const handleDoubleClick = () => {
    if (!track) return;
    play(track, playlistIds);
  };

  return (
    <Button
      variant="ghost"
      asChild
      className="px-2 py-8 w-full mb-2 active:scale-[99.5%]"
    >
      <div
        className={classNames(
          "flex items-center gap-4 hover:cursor-pointer tracking-normal transition-all duration-100",
          { "bg-accent": !isLoading && currentTrackId === track?.id }
        )}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex-[1.5] flex flex-row min-w-0">
          <Avatar className="rounded-[4px] w-12 h-12">
            {isLoading ? (
              <Skeleton className="w-12 h-12 rounded-[4px]" />
            ) : (
              <AvatarImage src={track.al.picUrl} alt={track.name} />
            )}
          </Avatar>

          <div className="flex flex-col text-left ml-3 justify-between min-w-0">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-32 mb-1 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </>
            ) : (
              <>
                <span className="truncate">{track.name}</span>
                <ArLink artits={track.ar} />
              </>
            )}
          </div>
        </div>

        <div className="text-[12px] font-medium text-ellipsis text-muted-foreground flex-1 hover:underline hover:cursor-pointer">
          {isLoading ? (
            <Skeleton className="h-3 w-20 rounded" />
          ) : (
            track.al.name
          )}
        </div>

        <div className="text-[12px] font-medium text-ellipsis text-muted-foreground flex-1 text-right">
          {isLoading ? (
            <Skeleton className="h-3 w-10 rounded" />
          ) : (
            fromMsToTimeString(track.dt)
          )}
        </div>
      </div>
    </Button>
  );
};
