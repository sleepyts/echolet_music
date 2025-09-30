import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue } from "jotai";
import { TrackBaseinfo } from "../long-song-card/components/base-info";
import { TrackBaseController } from "./components/base-controller";

export const BottomPlayer = () => {
  const currentTrack = useAtomValue(TrackState.CurrentTrack);
  if (!currentTrack) {
    return null;
  }
  return (
    <div className="bottom-0 left-0 right-0  p-4 border-t border-border flex justify-between">
      <div className="flex flex-row flex-2">
        <TrackBaseinfo
          albumUrl={currentTrack.track?.al?.picUrl}
          name={currentTrack.track?.name}
          artists={currentTrack.track?.ar}
        />
      </div>

      <div className="flex-2 flex items-center justify-center">
        <TrackBaseController />
      </div>
      <div className="flex-3 flex">
        <div className="ml-auto">21312</div>
      </div>
    </div>
  );
};
