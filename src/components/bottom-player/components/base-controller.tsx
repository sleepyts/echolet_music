import { TrackState } from "@/atoms/track-atoms";
import { Button } from "@/components/ui/button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect } from "react";

export const TrackBaseController = () => {
  const playOrPause = useSetAtom(TrackState.PlayOrPause);

  const isPause = useAtomValue(TrackState.IsPause);
  return (
    <div className="flex flex-row items-center">
      <Button variant="click-shrink" size="icon">
        <SkipBack />
      </Button>
      <Button
        variant="click-shrink"
        size="icon"
        onClick={() => {
          playOrPause();
        }}
      >
        {isPause ? <Play /> : <Pause />}
      </Button>
      <Button variant="click-shrink" size="icon">
        <SkipForward />
      </Button>
    </div>
  );
};
