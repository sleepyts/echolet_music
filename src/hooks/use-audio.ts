import { TrackApis } from "@/apis/track";
import { LyricState } from "@/atoms/lyric-atoms";
import { PlayerState } from "@/atoms/player-atoms";
import { TrackState } from "@/atoms/track-atoms";
import { GlobalAudioFunc } from "@/lib/audio";
import { APP_CONSTANTS } from "@/lib/consts";
import { appStore } from "@/lib/store";
import { useMount } from "ahooks";
import { useSetAtom } from "jotai";
import { toast } from "sonner";
import { getCurrentWindow } from "@tauri-apps/api/window";
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

  const playNext = useSetAtom(TrackState.PlayNext);

  useMount(async () => {
    // read current track time from local storage
    {
      const currentTrackTime = await appStore.get<{ currentTime: number }>(
        APP_CONSTANTS.TRACK_PLAY_TIME_STORAGE_KEY
      );
      setCurrentTrackTime(currentTrackTime?.currentTime || 0);
      reloadGlobalAudio();
    }

    // register a series of event listeners
    {
      GlobalAudioFunc.registerUpdateCurrentTime((currentTime) => {
        setCurrentTrackTime(currentTime);
        setRencentLyricIndex();
      });

      GlobalAudioFunc.registerOnEnded(async () => {
        const nextTrackId = await generateNextTrackId(true);
        await TrackApis.getTrackDetail([nextTrackId]).then((res: any) => {
          if (res?.songs?.[0]) {
            startPlay(res?.songs?.[0]);
          }
        });
      });

      GlobalAudioFunc.registerOnError(() => {
        toast.error("播放出错", { position: "top-right" });
        playNext();
      });
    }

    // write current track time to local storage when close window
    {
      getCurrentWindow().listen("tauri://close-requested", () => {
        pause();
        writeCurrentTrackTimeToCache();

        getCurrentWindow().destroy();
      });
    }
  });
};
