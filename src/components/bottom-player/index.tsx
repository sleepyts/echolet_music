import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue } from "jotai";
import { TrackBaseinfo } from "../long-song-card/components/base-info";
import { TrackBaseController } from "./components/base-controller";
import { ProgressSlider } from "./components/progress-slider";
import { useModal } from "./use-modal";

export const BottomPlayer = () => {
  useModal();

  const currentTrack = useAtomValue(TrackState.CurrentTrack);
  const currentTrackTime = useAtomValue(TrackState.CurrentTrackTime);
  const currentTrackDuration = useAtomValue(TrackState.CurrentTrackDuration);

  if (!currentTrack || !currentTrack.track) {
    return null;
  }
  const trackData = currentTrack?.track;

  return (
    <div>
      <ProgressSlider
        value={currentTrackTime}
        max={currentTrackDuration}
        step={1}
      />
      <div className="bottom-0 left-0 right-0  p-4 border-t flex justify-between border-sky-200">
        <div className="flex flex-row flex-1">
          <TrackBaseinfo
            albumUrl={trackData?.al?.picUrl}
            name={trackData?.name}
            artists={trackData?.ar}
          />
        </div>

        <div className="flex justify-center items-center felx-1 ">
          <TrackBaseController />
        </div>

        <div className="flex-1 flex">
          <div className="ml-auto">21312</div>
        </div>
      </div>
    </div>
  );
};
