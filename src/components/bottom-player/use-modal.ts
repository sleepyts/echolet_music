import { TrackState } from "@/atoms/track-atoms";
import { useMount } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";

export const useModal = () => {
  const GlobalAudio = useAtomValue(TrackState.GlobalAudio);

  const OnAudioTimeUpdate = useSetAtom(TrackState.OnAudioTimeChange);
  useMount(() => {
    GlobalAudio.ontimeupdate = () => {
      OnAudioTimeUpdate();
    };
  });
};
