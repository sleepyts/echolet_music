import { PlayerState } from "@/atoms/player-atoms";
import { Button } from "@/components/ui/button";
import { PlayModeEnum } from "@/lib/enums";
import { useAtomValue, useSetAtom } from "jotai";
import { Repeat1Icon, RepeatIcon, ShuffleIcon } from "lucide-react";

export const TrackPlayerController = () => {
  const changePlayMode = useSetAtom(PlayerState.changePlayMode);

  const currentPlayMode = useAtomValue(PlayerState.currentPlayMode);

  const renderIcon = () => {
    switch (currentPlayMode) {
      case PlayModeEnum.Sequence:
        return <RepeatIcon />;
      case PlayModeEnum.Loop:
        return <Repeat1Icon />;
      case PlayModeEnum.Random:
        return <ShuffleIcon />;
    }
  };
  return (
    <div className="flex flex-row items-center ">
      <Button
        size={"icon"}
        variant={"click-shrink"}
        onClick={() => changePlayMode()}
        className="ml-auto"
      >
        {renderIcon()}
      </Button>
    </div>
  );
};
