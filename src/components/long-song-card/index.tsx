import { fromMsToTimeString } from "@/lib/utils";
import { ArLink } from "../ar-link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import classNames from "classnames";

interface LongSongCardProps {
  track: any;
}

export const LongSongCard = ({ track }: LongSongCardProps) => {
  const play = useSetAtom(TrackState.StartPlay);
  const currentTrackId = useAtomValue(TrackState.CurrentTrackId);
  const handleDoubleClick = () => {
    console.log(track);
    play(track);
  };
  return (
    <Button
      variant="ghost"
      asChild
      className="px-2 py-8 w-full mb-2 active:scale-[99.5%]"
    >
      <div
        className={classNames(
          "flex items-center gap-4 hover:cursor-pointer tracking-normal transition-all duration-100 ",
          { "bg-accent": currentTrackId === track.id },
        )}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex-[1.5] flex flex-row min-w-0 ">
          <Avatar className="rounded-[4px] w-12 h-12">
            <AvatarImage src={track.al.picUrl} alt={track.name} />
          </Avatar>
          <div className="flex flex-col text-left ml-3 justify-between min-w-0">
            {track.name}
            <ArLink artits={track.ar} />
          </div>
        </div>

        <div className="text-[10px] font-medium text-ellipsis text-muted-foreground flex-1 hover:underline hover:cursor-pointer">
          {track.al.name}
        </div>

        <div className="text-[10px] font-medium text-ellipsis text-muted-foreground flex-1 text-right">
          {fromMsToTimeString(track.dt)}
        </div>
      </div>
    </Button>
  );
};
