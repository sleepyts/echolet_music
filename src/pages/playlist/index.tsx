import { useParams } from "react-router-dom";
import { usePlaylistModel } from "./use-model";
import { LongSongCard } from "@/components/long-song-card";

export const PlaylistPage = () => {
  const id = useParams().id;
  const { playlistTracks, loading, playlistIds } = usePlaylistModel(Number(id));

  return (
    <div>
      {playlistTracks.map((track) => (
        <LongSongCard
          key={track.id}
          track={track}
          isLoading={loading}
          playlistIds={playlistIds}
        />
      ))}
    </div>
  );
};
