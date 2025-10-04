import { PlaylistApis } from "@/apis/playlist";
import { useMount } from "ahooks";
import { useState } from "react";

export const usePlaylistModel = (id?: number) => {
  const [playlistTracks, setPlaylistTrack] = useState<any[]>([]);

  useMount(() => {
    if (!id) {
      return;
    }
    PlaylistApis.getPlaylistDetail(id).then((res: any) => {
      setPlaylistTrack(res.playlist.tracks);
    });
  });

  return {
    playlistTracks,
  };
};
