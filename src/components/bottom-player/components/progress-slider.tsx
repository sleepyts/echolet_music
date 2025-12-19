import { TrackState } from "@/atoms/track-atoms";
import { Slider } from "@/components/ui/slider";
import { GlobalAudioFunc } from "@/lib/audio";
import { FormatUtils } from "@/lib/utils";
import { useUpdateEffect } from "ahooks";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import { useState } from "react";
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

  const [innerValue, setInnerValue] = useState(currentTrackTime);
  const [changingValue, setChangingValue] = useState(false);
  useUpdateEffect(() => {
    if (changingValue) return;
    setInnerValue(currentTrackTime);
  }, [currentTrackTime]);
  return (
    <div
      className={classNames(
        "w-full flex justify-center items-center gap-2",
        className
      )}
    >
      <span className="text-[12px] text-muted-foreground">
        {FormatUtils.fromSsToTimeString(innerValue)}
      </span>
      <Slider
        value={[innerValue]}
        onValueChange={(value) => {
          setChangingValue(true);
          setInnerValue(value[0]);
        }}
        onValueCommit={(value) => {
          setChangingValue(false);
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
