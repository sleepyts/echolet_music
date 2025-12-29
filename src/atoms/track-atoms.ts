import { TrackApis } from "@/apis/track";
import { APP_CONSTANTS } from "@/lib/consts";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PlayerState } from "./player-atoms";
import { GlobalAudioFunc } from "@/lib/audio";
import { FormatUtils, LocalStorageUtils } from "@/lib/utils";
import { appStore } from "@/lib/store";
import { toast } from "sonner";

const GlobalAudio = new Audio();

interface TrackState {
  track: any;

  trackUrl: string;

  playing: boolean;

  duration: number;
}

// as a single atom to avoid write localstorage when change
const CurrentTrackTimeAtom = atom<number>(0);

const WriteCurrentTrackTimeToCacheAction = atom(null, (get, set) => {
  appStore.set(APP_CONSTANTS.TRACK_PLAY_TIME_STORAGE_KEY, {
    currentTime: get(CurrentTrackTimeAtom),
  });
});

const CurrentTrackAtom = atomWithStorage<TrackState>(
  APP_CONSTANTS.TRACK_STORAGE_KEY,
  {
    track: null,
    playing: false,
    duration: 0,
    trackUrl: "",
  },
  {
    setItem: async (key: string, value: TrackState) => {
      await appStore.set(key, value);
    },
    getItem: async (key: string, initialValue: TrackState) => {
      console.log(await appStore.get<TrackState>(key));
      return (await appStore.get<TrackState>(key)) || initialValue;
    },
    removeItem: async (key: string) => {
      await appStore.delete(key);
    },
  }
);

const IsPlayingAtom = atom(async (get) => {
  const track = await get(CurrentTrackAtom);
  return track?.playing || false;
});

const CurrentTrackIdAtom = atom(async (get) => {
  const track = await get(CurrentTrackAtom);
  return track?.track?.id;
});

const CurrentTrackDurationAtom = atom(async (get) => {
  const track = await get(CurrentTrackAtom);
  return track?.duration || 0;
});

const CurrentTrackUrlAtom = atom(async (get) => {
  const track = await get(CurrentTrackAtom);
  return track?.trackUrl || "";
});

// start play a track when double click the track card
const StartPlayAction = atom(
  null,
  async (get, set, track: any, playlistIds?: number[]) => {
    const prevTrack = await get(CurrentTrackAtom);
    const prevPlaylistIds = get(PlayerState.current).playlistIds;

    await TrackApis.getMusicUrl([track.id]).then((res: any) => {
      const url = res?.data?.[0]?.url || "";

      if (!url) {
        toast.error("未找到歌曲信息", { position: "top-right" });
        return;
      }

      GlobalAudioFunc.togglePlay(() =>
        set(CurrentTrackAtom, {
          ...prevTrack,
          playing: false,
          track,
          currentTime: 0,
          duration: FormatUtils.fromMsToSecond(track?.dt || 0),
        })
      );
      GlobalAudioFunc.startANewTrack(url, () => {
        set(CurrentTrackAtom, {
          ...prevTrack,
          playing: true,
          track,
          currentTime: 0,
          duration: FormatUtils.fromMsToSecond(track?.dt || 0),
          trackUrl: res?.data?.[0]?.url || "",
        });

        set(PlayerState.current, {
          ...get(PlayerState.current),
          playlistIds: playlistIds || prevPlaylistIds || [track?.id],
        });
      });
    });
  }
);

// pause current track when click pause button
const PauseAction = atom(null, async (get, set) => {
  const prevTrack = await get(CurrentTrackAtom);

  GlobalAudioFunc.togglePlay(() => {
    set(CurrentTrackAtom, {
      ...prevTrack,
      playing: false,
    });
  });
});

// play current track when click play button
const PlayAction = atom(null, async (get, set) => {
  const prevTrack = await get(CurrentTrackAtom);

  GlobalAudioFunc.togglePlay(() => {
    set(CurrentTrackAtom, {
      ...prevTrack,
      playing: true,
    });
  });
});

const PlayNextAction = atom(null, async (get, set, isBackward?: boolean) => {
  const nextTrackId = await set(
    PlayerState.generateNextTrackId,
    false,
    isBackward
  );

  await TrackApis.getTrackDetail([nextTrackId]).then((res: any) => {
    if (res?.songs?.[0]) {
      set(StartPlayAction, res?.songs?.[0]);
    }
  });
});

const ReloadGlobalAudioAction = atom(null, async (get, set) => {
  const trackUrl = await get(CurrentTrackUrlAtom);
  GlobalAudioFunc.loadUrl(trackUrl);
  const currentTrackTime = await get(CurrentTrackTimeAtom);
  GlobalAudioFunc.jumpTo(currentTrackTime);
});

export const TrackState = {
  GlobalAudio,
  CurrentTrack: CurrentTrackAtom,
  IsPlaying: IsPlayingAtom,
  CurrentTrackId: CurrentTrackIdAtom,
  CurrentTrackTime: CurrentTrackTimeAtom,
  CurrentTrackDuration: CurrentTrackDurationAtom,
  CurrentTrackUrl: CurrentTrackUrlAtom,
  ReloadGlobalAudio: ReloadGlobalAudioAction,

  StartPlay: StartPlayAction,
  Pause: PauseAction,
  Play: PlayAction,
  PlayNext: PlayNextAction,
  WriteCurrentTrackTimeToCache: WriteCurrentTrackTimeToCacheAction,
};
