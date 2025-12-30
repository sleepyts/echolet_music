import { useDebounceEffect } from "ahooks";
import { useState } from "react";

interface IProps {
  playlistTracks: any[];
}

export const usePlaylistSearch = (props: IProps) => {
  const { playlistTracks } = props;
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);
  useDebounceEffect(
    () => {
      if (!search) {
        setFilteredTracks(playlistTracks);
        return;
      }
      setFilteredTracks(
        playlistTracks.filter(
          (track) =>
            track.name.toLowerCase().includes(search.toLowerCase()) ||
            track.ar.some((artist: any) =>
              artist.name.toLowerCase().includes(search.toLowerCase())
            ) ||
            track.al.name.toLowerCase().includes(search.toLowerCase()) ||
            track?.alis?.some((alias: any) =>
              alias.toLowerCase().includes(search.toLowerCase())
            )
        )
      );
    },
    [search, playlistTracks],
    { wait: search ? 500 : 0 }
  );
  return {
    search,
    setSearch,

    playlistTracks: filteredTracks,
  };
};
