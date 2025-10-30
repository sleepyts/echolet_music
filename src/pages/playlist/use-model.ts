import { PlaylistApis } from "@/apis/playlist";
import type { Pagination } from "@/lib/types";
import { DomUtils } from "@/lib/utils";
import { useCreation, useInViewport, useUpdateEffect } from "ahooks";
import { useEffect, useState, type RefObject } from "react";
import { useParams } from "react-router";

export const usePlaylistModel = ({
  bottomLoadMoreRef,
}: {
  bottomLoadMoreRef: RefObject<HTMLDivElement>;
}) => {
  const [playlistTracks, setPlaylistTrack] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const id = useParams().id as unknown as number;

  const [currentPage, setCurrentPage] = useState<Pagination>({
    limit: 15,
    offset: 0,
  });

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    DomUtils.scrollAppMainContainerToTop();
    fetchPlaylistTrack(true);

    return () => {
      queueMicrotask(() => {
        setLoading(true);
        setPlaylistTrack([]);
        setHasMore(true);
      });
    };
  }, [id]);

  const fetchPlaylistTrack = (reset?: boolean) => {
    if (!id) {
      return;
    }

    if (reset) {
      setCurrentPage({
        limit: 15,
        offset: 0,
      });
    }
    PlaylistApis.getPlaylistTrack(
      id,
      reset ? 15 : currentPage.limit,
      reset ? 0 : currentPage.offset
    )
      .then(async (res: any) => {
        if (reset) {
          setPlaylistTrack(res.songs);
        } else {
          setPlaylistTrack((prev) => [...prev, ...res.songs]);
        }
        setCurrentPage((prev) => ({
          ...prev,
          offset: prev.offset + prev.limit,
        }));
        setHasMore(res.songs.length >= currentPage.limit);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const playlistIds = useCreation(
    () => playlistTracks.map((item) => item.id),
    [playlistTracks]
  );

  const [bottomInView] = useInViewport(bottomLoadMoreRef);

  useUpdateEffect(() => {
    if (bottomInView && hasMore) {
      fetchPlaylistTrack();
    }
  }, [bottomInView, hasMore]);

  return {
    playlistTracks,
    loading,
    playlistIds,
  };
};
