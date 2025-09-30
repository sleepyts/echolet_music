import type { Profile } from "@/apis/modal";
import { UserApis } from "@/apis/user";
import { UserInfoState } from "@/atoms/user-atoms";
import { useMount } from "ahooks";
import { atom, useSetAtom } from "jotai";

export const useAccount = () => {
  const setUserProfile = useSetAtom(UserInfoState.accountProfile);
  const setIsLogin = useSetAtom(UserInfoState.isLogin);

  useMount(() => {
    UserApis.getCurrentUserInfo().then((res) => {
      if (res.code === 200 && res.profile) {
        setUserProfile(res.profile);
        setIsLogin(true);
      }
    });
  });
};
