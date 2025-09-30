import { atom, useAtom } from "jotai";

const GlobalAudioAtom = atom<HTMLAudioElement>(new Audio());

const playAtom = atom(
  (get) => get(GlobalAudioAtom),
  (get, set, url: string) => {
    const audio = get(GlobalAudioAtom);
    console.log(audio);
    if (audio) {
      audio.src = url;
      audio.play();
    }
  }
);

export const TrackState = {
  GlobalAudio: GlobalAudioAtom,
  play: playAtom,
};
