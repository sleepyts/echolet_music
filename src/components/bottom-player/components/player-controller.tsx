import { PlayerState } from "@/atoms/player-atoms";
import { PlayerDetail } from "@/components/player-detail";
import { Button } from "@/components/ui/button";
import { PlayModeEnum } from "@/lib/enums";
import { useMemoizedFn } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";
import { HeartIcon, Repeat1Icon, RepeatIcon, ShuffleIcon } from "lucide-react";

export const TrackPlayerController = () => {
  const changePlayMode = useSetAtom(PlayerState.changePlayMode);

  const currentPlayMode = useAtomValue(PlayerState.currentPlayMode);

  const renderPlayModeIcon = useMemoizedFn(() => {
    switch (currentPlayMode) {
      case PlayModeEnum.Sequence:
        return <RepeatIcon />;
      case PlayModeEnum.Loop:
        return <Repeat1Icon />;
      case PlayModeEnum.Random:
        return <ShuffleIcon />;
    }
  });

  const renderLikeIcon = useMemoizedFn(() => {
    return <HeartIcon />;
  });
  return (
    <div className="flex flex-row items-center ">
      <Button size={"icon"} variant={"click-shrink"}>
        {renderLikeIcon()}
      </Button>
      <Button
        size={"icon"}
        variant={"click-shrink"}
        onClick={() => changePlayMode()}
      >
        {renderPlayModeIcon()}
      </Button>

      <PlayerDetail />
    </div>
  );
};
