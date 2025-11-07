import { TrackState } from "@/atoms/track-atoms";
import { Slider } from "@/components/ui/slider";
import { GlobalAudioFunc } from "@/lib/audio";
import { FormatUtils } from "@/lib/utils";
import classNames from "classnames";
import { useAtomValue } from "jotai";
interface ProgressSliderProps {
  step?: number;

  className?: string;
}

export const ProgressSlider = ({
  step = 1,
  className,
}: ProgressSliderProps) => {
  const currentTrackTime = useAtomValue(TrackState.CurrentTrackTime);
  const currentTrackDuration = useAtomValue(TrackState.CurrentTrackDuration);

  return (
    <div
      className={classNames(
        "w-full flex justify-center items-center gap-2",
        className
      )}
    >
      <span className="text-[12px] text-muted-foreground">
        {FormatUtils.fromSsToTimeString(currentTrackTime)}
      </span>
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
      />
      <span className="text-[12px] text-muted-foreground">
        {FormatUtils.fromSsToTimeString(currentTrackDuration)}
      </span>
    </div>
  );
};
