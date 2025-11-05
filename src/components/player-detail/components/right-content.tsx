import { TrackState } from "@/atoms/track-atoms";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAtomValue } from "jotai";

const PlayerDetailRightContent = () => {
  const currentTrack = useAtomValue(TrackState.CurrentTrack);
  return <div className="flex-[1.5]"></div>;
};

export default PlayerDetailRightContent;
