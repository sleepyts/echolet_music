import { fromMsToTimeString } from "@/lib/utils";
import { ArLink } from "../ar-link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { TrackApis } from "@/apis/track";
import { TrackState } from "@/atoms/track-atoms";
import { useSetAtom } from "jotai";

interface LongSongCardProps {
  track: any;
}

export const LongSongCard = ({ track }: LongSongCardProps) => {
  const play = useSetAtom(TrackState.play);
  const handleDoubleClick = () => {
    TrackApis.getMusicUrl([track.id]).then((res: any) => {
      console.log(res.data[0].url);
      play(res.data[0].url);
    });
  };
  return (
    <Button variant="ghost" asChild className="px-2 py-8 w-full">
      <div
        className="flex items-center gap-4 active:scale-99"
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
