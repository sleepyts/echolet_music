import { TrackApis } from "@/apis/track";
import { APP_CONSTANTS } from "@/lib/consts";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const GlobalAudioAtom = atom<HTMLAudioElement>(new Audio());

interface TrackState {
  track: any;

  playing: boolean;

  currentTime: number;

  duration: number;
}

const CurrentTrackAtom = atomWithStorage<TrackState>(
  APP_CONSTANTS.TRACK_STORAGE_KEY,
  {
    track: null,
    playing: false,
    currentTime: 0,
    duration: 0,
  },
);

const IsPlayingAtom = atom((get) => get(CurrentTrackAtom).playing);

const CurrentTrackIdAtom = atom((get) => get(CurrentTrackAtom).track?.id);

const CurrentTrackTimeAtom = atom((get) => get(CurrentTrackAtom).currentTime);

const CurrentTrackDurationAtom = atom((get) => get(CurrentTrackAtom).duration);

const StartPlayAction = atom(null, (get, set, track: any) => {
  const audio = get(GlobalAudioAtom);
  const prevTrack = get(CurrentTrackAtom);

  TrackApis.getMusicUrl([track.id]).then((res: any) => {
    const url = res.data[0].url;
    audio.src = url;
    audio.play().then(() => {
      set(CurrentTrackAtom, {
        ...prevTrack,
        playing: true,
        track,
        duration: audio.duration,
        currentTime: 0,
      });
    });
  });
});

const PlayOrPauseAction = atom(null, (get, set) => {
  const audio = get(GlobalAudioAtom);
  const prevTrack = get(CurrentTrackAtom);

  if (prevTrack.playing) {
    audio.pause();
    set(CurrentTrackAtom, { ...prevTrack, playing: false });
  } else {
    audio.play();
    set(CurrentTrackAtom, { ...prevTrack, playing: true });
  }
});

const OnAudioTimeChange = atom(null, (get, set) => {
  const audio = get(GlobalAudioAtom);
  const prevTrack = get(CurrentTrackAtom);

  set(CurrentTrackAtom, { ...prevTrack, currentTime: audio.currentTime });
});

const TrackJumpAction = atom(null, (get, set, time: number) => {
  const audio = get(GlobalAudioAtom);
  const prevTrack = get(CurrentTrackAtom);

  audio.currentTime = time;
  set(CurrentTrackAtom, { ...prevTrack, currentTime: time });
});

export const TrackState = {
  GlobalAudio: GlobalAudioAtom,
  CurrentTrack: CurrentTrackAtom,
  IsPlaying: IsPlayingAtom,
  CurrentTrackId: CurrentTrackIdAtom,
  CurrentTrackTime: CurrentTrackTimeAtom,
  CurrentTrackDuration: CurrentTrackDurationAtom,

  StartPlay: StartPlayAction,
  PlayOrPause: PlayOrPauseAction,
  OnAudioTimeChange: OnAudioTimeChange,
  TrackJump: TrackJumpAction,
};
