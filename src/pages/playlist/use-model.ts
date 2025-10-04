import { PlaylistApis } from "@/apis/playlist";
import { useMount } from "ahooks";
import { useState } from "react";

export const usePlaylistModel = (id?: number) => {
  const [playlistTracks, setPlaylistTrack] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useMount(() => {
    if (!id) {
      return;
    }
    PlaylistApis.getPlaylistDetail(id)
      .then(async (res: any) => {
        setPlaylistTrack(res.playlist.tracks);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return {
    playlistTracks,
    loading,
  };
};
