import { useParams } from "react-router-dom";
import { usePlaylistModel } from "./use-model";
import { LongSongCard } from "@/components/long-song-card";

export const PlaylistPage = () => {
  const id = useParams().id;
  const { playlistTracks, loading } = usePlaylistModel(Number(id));
  return (
    <div>
      {playlistTracks.map((track) => (
        <div>
          <LongSongCard key={track.id} track={track} isLoading={loading} />
        </div>
      ))}
    </div>
  );
};
