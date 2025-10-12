import { TrackState } from "@/atoms/track-atoms";
import { TrackBaseinfo } from "../long-song-card/components/base-info";
import { TrackBaseController } from "./components/base-controller";
import { ProgressSlider } from "./components/progress-slider";
import { useAtomValue } from "jotai";
import { TrackPlayerController } from "./components/player-controller";
export const BottomPlayer = () => {
  const currentTrack = useAtomValue(TrackState.CurrentTrack);

  if (!currentTrack || !currentTrack.track) {
    return null;
  }
  const trackData = currentTrack?.track;

  return (
    <div>
      <ProgressSlider step={1} />
      <div className="bottom-0 left-0 right-0  p-4 border-t flex  border-sky-200 gap-10">
        <div className="flex flex-row flex-1 min-w-0">
          <TrackBaseinfo
            albumUrl={trackData?.al?.picUrl}
            name={trackData?.name}
            artists={trackData?.ar}
          />
        </div>

        <div className="flex justify-center items-center felx-1 ">
          <TrackBaseController />
        </div>

        <div className="flex-1 flex justify-end">
          <TrackPlayerController />
        </div>
      </div>
    </div>
  );
};
