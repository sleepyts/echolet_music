import { usePlaylistModel } from "./use-model";
import { LongSongCard } from "@/components/long-song-card";
import { LongSongCardContextMenu } from "@/components/long-song-card/components/context-menu";
import { useRef } from "react";

export const PlaylistPage = () => {
  const bottomLoadMoreRef = useRef<HTMLDivElement>(null);

  const { playlistTracks, loading, playlistIds } = usePlaylistModel({
    bottomLoadMoreRef,
  });

  return (
    <div>
      {!loading
        ? playlistTracks.map((track) => (
            <LongSongCardContextMenu track={track} playlistIds={playlistIds}>
              <LongSongCard
                key={track.id}
                track={track}
                isLoading={loading}
                playlistIds={playlistIds}
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
