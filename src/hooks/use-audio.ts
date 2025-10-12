import { TrackApis } from "@/apis/track";
import { PlayerState } from "@/atoms/player-atoms";
import { TrackState } from "@/atoms/track-atoms";
import { GlobalAudioFunc } from "@/lib/audio";
import { useMount } from "ahooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export const useAudio = () => {
  const setCurrentTrackTime = useSetAtom(TrackState.CurrentTrackTime);

  const generateNextTrackId = useSetAtom(PlayerState.generateNextTrackId);

  const currentTrackId = useAtomValue(TrackState.CurrentTrackId);

  const startPlay = useSetAtom(TrackState.StartPlay);
  useMount(() => {
    GlobalAudioFunc.registerUpdateCurrentTime((currentTime) => {
      setCurrentTrackTime(currentTime);
    });

    GlobalAudioFunc.registerOnEnded(() => {
      console.log("onEnded");
      const nextTrackId = generateNextTrackId(true, currentTrackId);

      TrackApis.getTrackDetail([nextTrackId]).then((res: any) => {
        console.log("getTrackDetail", res);
        if (res?.songs?.[0]) {
          startPlay(res?.songs?.[0]);
        }
      });
    });
  });
};
