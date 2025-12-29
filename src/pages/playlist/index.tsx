import { usePlaylistModel } from "./use-model";
import { LongSongCard } from "@/components/long-song-card";
import { LongSongCardContextMenu } from "@/components/long-song-card/components/context-menu";
import { useRef } from "react";
import { PlaylistShortInfo } from "./components/playlist-short-info";
import { usePlaylistSearch } from "./hooks/use-playlist-search";

export const PlaylistPage = () => {
  const bottomLoadMoreRef = useRef<HTMLDivElement>(null);

  const { playlistTracks, loading, playlistIds, playlistDetail } =
    usePlaylistModel({
      bottomLoadMoreRef,
    });

  const { setSearch, playlistTracks: filteredTracks } = usePlaylistSearch({
    playlistTracks,
  });
  return (
    <div>
      {
        <PlaylistShortInfo
          playlistDetail={playlistDetail}
          isLoading={loading}
          playlistIds={playlistIds}
          playlistTracks={playlistTracks}
          setSearch={setSearch}
        />
      }
      {!loading
        ? filteredTracks.map((track, index) => (
            <LongSongCardContextMenu track={track} playlistIds={playlistIds}>
              <LongSongCard
                key={track.id}
                track={track}
                isLoading={loading}
                playlistIds={playlistIds}
                index={index + 1}
              />
            </LongSongCardContextMenu>
          ))
        : Array(20)
            .fill(0)
            .map((_, index) => (
              <LongSongCard
                key={index}
                track={undefined}
                isLoading={loading}
                playlistIds={playlistIds}
              />
            ))}
      {!loading && <div ref={bottomLoadMoreRef} />}
    </div>
  );
};
