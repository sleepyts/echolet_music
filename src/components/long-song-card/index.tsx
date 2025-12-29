import { ArLink } from "../ar-link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import classNames from "classnames";
import { FormatUtils } from "@/lib/utils";

interface LongSongCardProps {
  track?: any;
  isLoading?: boolean;

  index?: number;
  playlistIds?: number[];
}

export const LongSongCard = ({
  track,
  isLoading = false,
  index,
  playlistIds = [],
}: LongSongCardProps) => {
  const play = useSetAtom(TrackState.StartPlay);
  const currentTrackId = useAtomValue(TrackState.CurrentTrackId);

  const handleDoubleClick = () => {
    if (!track) return;
    play(track, playlistIds);
  };

  if (isLoading) {
    return <LongSongCardSkeleton index={index} />;
  }

  return (
    <Button
      variant="ghost"
      asChild
      className=" w-full mb-2 active:scale-[99.5%] h-fit"
    >
      <div
        className={classNames(
          "flex items-center gap-4 hover:cursor-pointer tracking-normal transition-all duration-100",
          { "bg-accent": currentTrackId === track?.id }
        )}
        onDoubleClick={handleDoubleClick}
      >
        <div className="text-center w-[12px] mr-2">{index}</div>
        <div className="flex-[1.5] flex flex-row min-w-0">
          <Avatar className="rounded-[4px] w-12 h-12">
            <AvatarImage
              src={`${track.al.picUrl}?param=120y120`}
              alt={track.name}
              loading="lazy"
            />
          </Avatar>

          <div className="flex flex-col text-left ml-3 justify-between min-w-0">
            <span className="truncate ">
              {track.name}
              <span className="text-[12px] text-muted-foreground ml-1">
                {track.alia[0] ? `(${track.alia[0]})` : ""}
              </span>
            </span>
            <ArLink artits={track.ar} />
          </div>
        </div>

        <div className="text-[12px] font-medium text-ellipsis text-muted-foreground flex-2 hover:underline hover:cursor-pointer text-left">
          {track.al.name}
        </div>

        <div className="text-[12px] font-medium text-ellipsis text-muted-foreground flex-1 text-right">
          {FormatUtils.fromMsToTimeString(track.dt)}
        </div>
      </div>
    </Button>
  );
};

const LongSongCardSkeleton = ({ index }: { index?: number }) => {
  return (
    <div className="flex items-center gap-4 w-full mb-2 h-fit p-2">
      <div className="w-[12px] text-left text-sm">{index}</div>
      <div className="flex-[1.5] flex flex-row min-w-0 items-center">
        <Skeleton className="rounded-[4px] w-12 h-12" />
        <div className="flex flex-col ml-3 space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>
      <div className="flex-1">
        <Skeleton className="h-3 w-20 rounded" />
      </div>
      <div className="flex-1 flex justify-end">
        <Skeleton className="h-3 w-10 rounded" />
      </div>
    </div>
  );
};
