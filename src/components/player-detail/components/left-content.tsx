import { TrackState } from "@/atoms/track-atoms";
import { ArLink } from "@/components/ar-link";
import { TrackBaseController } from "@/components/bottom-player/components/base-controller";
import { TrackPlayerController } from "@/components/bottom-player/components/player-controller";
import { ProgressSlider } from "@/components/bottom-player/components/progress-slider";
import { useAtomValue } from "jotai";

const PlayerDetailLeftContent = () => {
  const currentTrack = useAtomValue(TrackState.CurrentTrack);
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-[384px]">
        <img
          src={currentTrack?.track?.al?.picUrl}
          alt={currentTrack?.track?.name}
        />

        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col text-left  min-w-0 mt-3">
            <span
              className="text-ellipsis whitespace-nowrap overflow-hidden "
              title={currentTrack?.track?.name}
            >
              {currentTrack?.track?.name}
            </span>
            <ArLink artits={currentTrack?.track?.ar} />
          </div>
          <TrackPlayerController withDetail={false} />
        </div>

        <ProgressSlider step={1} className="mt-4" />
        <TrackBaseController className="mt-4 justify-center" />
      </div>
    </div>
  );
};

export default PlayerDetailLeftContent;
