import { atom } from "jotai";

const UserPlaylistAtom = atom<any[]>([]);

export const UserPlaylistState = {
  userPlaylist: UserPlaylistAtom,
};
