import { PlaylistApis } from "@/apis/playlist";
import { useEffect, useState } from "react";

export const usePlaylistModel = (id?: number) => {
  const [playlistTracks, setPlaylistTrack] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
  }, [id]);

  return {
    playlistTracks,
    loading,
  };
};
