import { APP_CONSTANTS } from "@/lib/consts";
import { PlayModeEnum } from "@/lib/enums";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// track player state
interface PlayerState {
  volume: number;

  playMode: PlayModeEnum;

  playlistIds: number[];
}

const DEFAULT_PLAYER_STATE: PlayerState = {
  volume: 0.5,
  playMode: PlayModeEnum.Sequence,
  playlistIds: [],
};

const currentPlayModeAtom = atom((get) => get(playerStateAtom).playMode);
const generateNextTrackIdAction = atom(
  (get) => get(playerStateAtom),
  (
    get,
    _set,
    isPlayDoneGenerated: boolean,
    currentTrackId: number,
    isBackward?: boolean
  ) => {
    const { playMode, playlistIds } = get(playerStateAtom);

    console.log(playlistIds.indexOf(currentTrackId));
    if (!isBackward) {
      switch (playMode) {
        // sequence play mode , return next track id
        case PlayModeEnum.Sequence:
          return playlistIds[
            (playlistIds.indexOf(currentTrackId) + 1) % playlistIds.length
          ];
        // loop play mode, return current track id if play done generated, otherwise return next track id
        case PlayModeEnum.Loop:
          return !isPlayDoneGenerated
            ? currentTrackId
            : playlistIds[
                (playlistIds.indexOf(currentTrackId) + 1) % playlistIds.length
              ];
        // random play mode, return random track id except current track id , if only one track in playlist, return current track id to avoid infinite loop
        case PlayModeEnum.Random: {
          if (playlistIds.length <= 1) {
            return currentTrackId;
          }
          while (true) {
            const randomTrackId =
              playlistIds[Math.floor(Math.random() * playlistIds.length)];
            if (randomTrackId !== currentTrackId) {
              return randomTrackId;
            }
          }
        }
      }
    } else {
      switch (playMode) {
        // sequence play mode , return next track id
        case PlayModeEnum.Sequence:
          return playlistIds[
            (playlistIds.indexOf(currentTrackId) - 1 + playlistIds.length) %
              playlistIds.length
          ];
        // loop play mode, return current track id if play done generated, otherwise return next track id
        case PlayModeEnum.Loop:
          return !isPlayDoneGenerated
            ? currentTrackId
            : playlistIds[
                (playlistIds.indexOf(currentTrackId) - 1 + playlistIds.length) %
                  playlistIds.length
              ];
        // random play mode, return random track id except current track id , if only one track in playlist, return current track id to avoid infinite loop
        case PlayModeEnum.Random: {
          if (playlistIds.length <= 1) {
            return currentTrackId;
          }
          while (true) {
            const randomTrackId =
              playlistIds[Math.floor(Math.random() * playlistIds.length)];
            if (randomTrackId !== currentTrackId) {
              return randomTrackId;
            }
          }
        }
      }
    }
  }
);

const playerStateAtom = atomWithStorage<PlayerState>(
  APP_CONSTANTS.PLAYER_STORAGE_KEY,
  DEFAULT_PLAYER_STATE
);

const changePlayModeAction = atom(null, (get, set) => {
  const currentPlayMode = get(playerStateAtom).playMode;
  set(playerStateAtom, {
    ...get(playerStateAtom),
    playMode:
      currentPlayMode === PlayModeEnum.Sequence
        ? PlayModeEnum.Loop
        : currentPlayMode === PlayModeEnum.Loop
          ? PlayModeEnum.Random
          : PlayModeEnum.Sequence,
  });
});

export const PlayerState = {
  current: playerStateAtom,
  currentPlayMode: currentPlayModeAtom,
  generateNextTrackId: generateNextTrackIdAction,
  changePlayMode: changePlayModeAction,
};
