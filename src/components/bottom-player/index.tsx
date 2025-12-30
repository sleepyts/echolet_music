import { TrackState } from "@/atoms/track-atoms";
import { TrackBaseinfo } from "../long-song-card/components/base-info";
import { TrackBaseController } from "./components/base-controller";
import { ProgressSlider } from "./components/progress-slider";
import { useAtomValue } from "jotai";
import { TrackPlayerController } from "./components/player-controller";
export const BottomPlayer = () => {
  const currentTrack = useAtomValue(TrackState.CurrentTrack);

  if (!currentTrack || !currentTrack.track) {
    console.log("currentTrack", currentTrack);

    return null;
  }
  const trackData = currentTrack?.track;

  return (
    <div className="bottom-0 left-0 right-0  p-4 border-t flex  gap-10">
      <div className="flex flex-row flex-1 min-w-0">
        <TrackBaseinfo
          albumUrl={`${trackData?.al?.picUrl}?param=512y512`}
          name={trackData?.name}
          artists={trackData?.ar}
        />
      </div>

      <div className="flex justify-center items-center flex-1 flex-col">
        <TrackBaseController className=" justify-center" />
        <ProgressSlider step={1} />
      </div>

      <div className="flex-1 flex justify-end">
        <TrackPlayerController />
      </div>
    </div>
  );
};
