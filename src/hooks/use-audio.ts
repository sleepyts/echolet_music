import { TrackApis } from "@/apis/track";
import { LyricState } from "@/atoms/lyric-atoms";
import { PlayerState } from "@/atoms/player-atoms";
import { TrackState } from "@/atoms/track-atoms";
import { GlobalAudioFunc } from "@/lib/audio";
import { APP_CONSTANTS } from "@/lib/consts";
import { LocalStorageUtils } from "@/lib/utils";
import { useMount } from "ahooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";

export const useAudio = () => {
  const setCurrentTrackTime = useSetAtom(TrackState.CurrentTrackTime);

  const generateNextTrackId = useSetAtom(PlayerState.generateNextTrackId);

  const startPlay = useSetAtom(TrackState.StartPlay);

  const pause = useSetAtom(TrackState.Pause);

  const writeCurrentTrackTimeToCache = useSetAtom(
    TrackState.WriteCurrentTrackTimeToCache
  );
  const reloadGlobalAudio = useSetAtom(TrackState.ReloadGlobalAudio);

  const setRencentLyricIndex = useSetAtom(LyricState.SetRencentLyricIndex);

  useMount(() => {
    // read current track time from local storage
    {
      const currentTrackTime =
        LocalStorageUtils.readLocalStorage(
          APP_CONSTANTS.TRACK_PLAY_TIME_STORAGE_KEY
        )?.currentTime || 0;
      setCurrentTrackTime(currentTrackTime);
      reloadGlobalAudio();
    }

    // register a series of event listeners
    {
      GlobalAudioFunc.registerUpdateCurrentTime((currentTime) => {
        setCurrentTrackTime(currentTime);
        setRencentLyricIndex();
      });

      GlobalAudioFunc.registerOnEnded(() => {
        const nextTrackId = generateNextTrackId(true);
        TrackApis.getTrackDetail([nextTrackId]).then((res: any) => {
          if (res?.songs?.[0]) {
            startPlay(res?.songs?.[0]);
          }
        });
      });

      GlobalAudioFunc.registerOnError(() => {
        toast.error("播放出错", { position: "top-right" });
      });
    }

    // write current track time to local storage when unload page
    {
      window.addEventListener("beforeunload", () => {
        pause();
        writeCurrentTrackTimeToCache();
      });
    }
  });
};
