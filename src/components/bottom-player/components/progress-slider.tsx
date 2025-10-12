import { TrackState } from "@/atoms/track-atoms";
import { Slider } from "@/components/ui/slider";
import { GlobalAudioFunc } from "@/lib/audio";
import { useAtomValue } from "jotai";
interface ProgressSliderProps {
  step?: number;
}

export const ProgressSlider = ({ step = 1 }: ProgressSliderProps) => {
  const currentTrackTime = useAtomValue(TrackState.CurrentTrackTime);
  const currentTrackDuration = useAtomValue(TrackState.CurrentTrackDuration);

  return (
    <Slider
      value={[currentTrackTime]}
      onValueChange={(value) => {
        GlobalAudioFunc.jumpTo(value[0]);
      }}
      onValueCommit={(value) => {
        GlobalAudioFunc.jumpTo(value[0]);
      }}
      max={currentTrackDuration}
      step={step}
      trackClassName="data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:hover:cursor-pointer "
      rangeClassName="bg-blue-500 data-[orientation=horizontal]:h-0.5 bottom-0"
      thumbClassName="hover:cursor-pointer size-0 bg-blue-500 hover:ring-0"
    />
  );
};
