import { TrackState } from "@/atoms/track-atoms";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export const TrackBaseController = ({ className }: { className?: string }) => {
  const playing = useAtomValue(TrackState.IsPlaying);

  const pause = useSetAtom(TrackState.Pause);
  const play = useSetAtom(TrackState.Play);

  const playNext = useSetAtom(TrackState.PlayNext);
  return (
    <div>
      <div className={classNames("flex flex-row items-center", className)}>
        <Button variant="click-shrink" size="icon">
          <SkipBack onClick={() => playNext(true)} />
        </Button>
        <Button
          variant="click-shrink"
          size="icon"
          onClick={() => {
            playing ? pause() : play();
          }}
        >
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="click-shrink" size="icon" onClick={() => playNext()}>
          <SkipForward />
        </Button>
      </div>
    </div>
  );
};
