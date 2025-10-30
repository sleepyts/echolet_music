import { PlaylistApis } from "@/apis/playlist";
import { UserApis } from "@/apis/user";
import { UserPlaylistState } from "@/atoms/playlist-atoms";
import { UserInfoState } from "@/atoms/user-atoms";
import { useMount } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";

export const useAccount = () => {
  const setUserProfile = useSetAtom(UserInfoState.accountProfile);
  const setIsLogin = useSetAtom(UserInfoState.isLogin);
  const setPlaylists = useSetAtom(UserPlaylistState.userPlaylist);
  const uid = useAtomValue(UserInfoState.accountUid);

  useMount(async () => {
    await UserApis.getCurrentUserInfo().then((res) => {
      if (res.code === 200 && res.profile) {
        setUserProfile(res.profile);
        setIsLogin(true);
      }
    });
    await PlaylistApis.getUserPlaylist(uid || 0).then((res: any) => {
      setPlaylists(res.playlist || []);

      console.log(res);
    });
  });

  useMount(() => {});
};
