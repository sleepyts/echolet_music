import { TrackApis } from "@/apis/track";
import { PlayerState } from "@/atoms/player-atoms";
import { TrackState } from "@/atoms/track-atoms";
import { GlobalAudioFunc } from "@/lib/audio";
import { useMount } from "ahooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export const useAudio = () => {
  const setCurrentTrackTime = useSetAtom(TrackState.CurrentTrackTime);

  const generateNextTrackId = useSetAtom(PlayerState.generateNextTrackId);

  const startPlay = useSetAtom(TrackState.StartPlay);
  useMount(() => {
    GlobalAudioFunc.registerUpdateCurrentTime((currentTime) => {
      setCurrentTrackTime(currentTime);
    });

    GlobalAudioFunc.registerOnEnded(() => {
      const nextTrackId = generateNextTrackId(true);
      TrackApis.getTrackDetail([nextTrackId]).then((res: any) => {
        if (res?.songs?.[0]) {
          startPlay(res?.songs?.[0]);
        }
      });
    });
  });
};
