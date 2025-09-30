import type { Profile } from "@/apis/modal";
import { atom } from "jotai";

const accountProfileAtom = atom<Profile>();
const isLoginAtom = atom<boolean>(false);
const accountUidAtom = atom((get) => get(accountProfileAtom)?.userId);

export const UserInfoState = {
  accountProfile: accountProfileAtom,
  isLogin: isLoginAtom,
  accountUid: accountUidAtom,
};
