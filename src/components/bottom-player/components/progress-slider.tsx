import { TrackState } from "@/atoms/track-atoms";
import { Slider } from "@/components/ui/slider";
import { useUpdateEffect } from "ahooks";
import { useSetAtom } from "jotai";
import { useState } from "react";
interface ProgressSliderProps {
  value?: number;
  max?: number;
  step?: number;
}

export const ProgressSlider = ({
  value = 0,
  max = 100,
  step = 1,
}: ProgressSliderProps) => {
  const TrackJump = useSetAtom(TrackState.TrackJump);

  //  store a temp value for progress slider , avoid unnecessary re-renders
  const [innerValue, setInnerValue] = useState(value);

  //  update innerValue when value changes
  useUpdateEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <Slider
      value={[innerValue]}
      onValueChange={(value) => setInnerValue(value[0])}
      onValueCommit={(value) => TrackJump(value[0])}
      max={max}
      step={step}
      trackClassName="data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:hover:cursor-pointer "
      rangeClassName="bg-blue-500 data-[orientation=horizontal]:h-0.5 bottom-0"
      thumbClassName="hover:cursor-pointer size-0 bg-blue-500 hover:ring-0"
    />
  );
};
