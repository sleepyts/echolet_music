import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue } from "jotai";

const PlayerDetailLeftContent = () => {
  const currentTrack = useAtomValue(TrackState.CurrentTrack);
  return (
    <div className="flex-1">
      <img
        src={currentTrack?.track?.al?.picUrl}
        alt={currentTrack?.track?.name}
      />
    </div>
  );
};

export default PlayerDetailLeftContent;
