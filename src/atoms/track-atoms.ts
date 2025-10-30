import { TrackApis } from "@/apis/track";
import { APP_CONSTANTS } from "@/lib/consts";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PlayerState } from "./player-atoms";
import { GlobalAudioFunc } from "@/lib/audio";
import { TimeUtils } from "@/lib/utils";

const GlobalAudio = new Audio();

interface TrackState {
  track: any;

  trackUrl: string;

  playing: boolean;

  duration: number;
}

// as a single atom to avoid write localstorage when change
const CurrentTrackTimeAtom = atom<number>(0);

const CurrentTrackAtom = atomWithStorage<TrackState>(
  APP_CONSTANTS.TRACK_STORAGE_KEY,
  {
    track: null,
    playing: false,
    duration: 0,
    trackUrl: "",
  }
);

const IsPlayingAtom = atom((get) => get(CurrentTrackAtom).playing);

const CurrentTrackIdAtom = atom((get) => get(CurrentTrackAtom).track?.id);

const CurrentTrackDurationAtom = atom((get) => get(CurrentTrackAtom).duration);

const CurrentTrackUrlAtom = atom((get) => get(CurrentTrackAtom).trackUrl);

// start play a track when double click the track card
const StartPlayAction = atom(
  null,
  (get, set, track: any, playlistIds?: number[]) => {
    const prevTrack = get(CurrentTrackAtom);
    const prevPlaylistIds = get(PlayerState.current).playlistIds;

    GlobalAudioFunc.togglePlay(() =>
      set(CurrentTrackAtom, {
        ...prevTrack,
        playing: false,
        track,
        currentTime: 0,
        duration: TimeUtils.fromMsToSecond(track?.dt || 0),
      })
    );

    TrackApis.getMusicUrl([track.id]).then((res: any) => {
      GlobalAudioFunc.startANewTrack(res?.data?.[0]?.url || "", () => {
        set(CurrentTrackAtom, {
          ...prevTrack,
          playing: true,
          track,
          currentTime: 0,
          duration: TimeUtils.fromMsToSecond(track?.dt || 0),
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
const PauseAction = atom(null, (get, set) => {
  const prevTrack = get(CurrentTrackAtom);

  GlobalAudioFunc.togglePlay(() => {
    set(CurrentTrackAtom, {
      ...prevTrack,
      playing: false,
    });
  });
});

// play current track when click play button
const PlayAction = atom(null, (get, set) => {
  const prevTrack = get(CurrentTrackAtom);

  GlobalAudioFunc.togglePlay(() => {
    set(CurrentTrackAtom, {
      ...prevTrack,
      playing: true,
    });
  });
});

const PlayNextAction = atom(null, (get, set) => {
  const currentTrackId = get(CurrentTrackIdAtom);
  const nextTrackId = set(
    PlayerState.generateNextTrackId,
    true,
    currentTrackId
  );

  TrackApis.getTrackDetail([nextTrackId]).then((res: any) => {
    if (res?.songs?.[0]) {
      set(StartPlayAction, res?.songs?.[0]);
    }
  });
});
export const TrackState = {
  GlobalAudio,
  CurrentTrack: CurrentTrackAtom,
  IsPlaying: IsPlayingAtom,
  CurrentTrackId: CurrentTrackIdAtom,
  CurrentTrackTime: CurrentTrackTimeAtom,
  CurrentTrackDuration: CurrentTrackDurationAtom,
  CurrentTrackUrl: CurrentTrackUrlAtom,

  StartPlay: StartPlayAction,
  Pause: PauseAction,
  Play: PlayAction,
  PlayNext: PlayNextAction,
};
