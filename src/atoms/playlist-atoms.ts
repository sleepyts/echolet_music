import { PlaylistTypeEnum } from "@/lib/enums";
import { atom } from "jotai";

const UserPlaylistAtom = atom<any[]>([]);

const UserOwnPlaylistAtom = atom<any[]>((get) => {
  return get(UserPlaylistAtom).filter((item) => !item.subscribed);
});

const UserSubscribedPlaylistAtom = atom<any[]>((get) => {
  return get(UserPlaylistAtom).filter((item) => item.subscribed);
});

const CurrentPlaylistViewIdAtom = atom<number>();

const UserLikePlaylistAtom = atom<any>((get) => {
  return get(UserPlaylistAtom).filter(
    (item) => item.specialType == PlaylistTypeEnum.Like
  )[0];
});

const CurrentPlaylistAtom = atom<any>((get) => {
  return get(UserPlaylistAtom).find(
    (item) => item.id == get(CurrentPlaylistViewIdAtom)
  );
});
export const UserPlaylistState = {
  userPlaylist: UserPlaylistAtom,
  userOwnPlaylist: UserOwnPlaylistAtom,
  userSubscribedPlaylist: UserSubscribedPlaylistAtom,
  userLikePlaylist: UserLikePlaylistAtom,
  currentPlaylist: CurrentPlaylistAtom,

  currentPlaylistViewId: CurrentPlaylistViewIdAtom,
};
