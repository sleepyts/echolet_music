import { PlaylistApis } from "@/apis/playlist";
import { UserPlaylistState } from "@/atoms/playlist-atoms";
import { UserInfoState } from "@/atoms/user-atoms";
import type { Pagination } from "@/lib/types";
import { DomUtils } from "@/lib/utils";
import { useCreation, useInViewport, useUpdateEffect } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, type RefObject } from "react";
import { useParams } from "react-router";

export const usePlaylistModel = ({
  bottomLoadMoreRef,
}: {
  bottomLoadMoreRef: RefObject<HTMLDivElement>;
}) => {
  const isLogin = useAtomValue(UserInfoState.isLogin);
  const [playlistTracks, setPlaylistTrack] = useState<any[]>([]);
  const [playlistDetail, setCurrentPlaylistDetail] = useState<any>(undefined);
  const setCurrentPlaylistViewId = useSetAtom(
    UserPlaylistState.currentPlaylistViewId
  );
  const [loading, setLoading] = useState(true);
  const id = useParams().id as unknown as number;

  const [currentPage, setCurrentPage] = useState<Pagination>({
    limit: 40,
    offset: 0,
  });

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    DomUtils.scrollAppMainContainerToTop();
    fetchPlaylistDetail();
    fetchPlaylistTrack(true);
    setCurrentPlaylistViewId(id);

    return () => {
      queueMicrotask(() => {
        setLoading(true);
        setPlaylistTrack([]);
        setCurrentPlaylistDetail(undefined);
        setHasMore(true);
      });
    };
  }, [id]);

  const fetchPlaylistTrack = async (reset?: boolean) => {
    // only get track if not login
    if (!id || isLogin) {
      return;
    }

    if (reset) {
      setCurrentPage({
        limit: 40,
        offset: 0,
      });
    }
    await PlaylistApis.getPlaylistTrack(
      id,
      reset ? 40 : currentPage.limit,
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

  const fetchPlaylistDetail = async () => {
    if (!id) {
      return;
    }

    await PlaylistApis.getPlaylistDetail(id).then((res: any) => {
      console.log(res.playlist);
      setCurrentPlaylistDetail(res.playlist);

      // login user can get all tracks , otherwise only get 20 tracks , we ignore it if not login
      if (isLogin) {
        setPlaylistTrack(res.playlist.tracks);
        setLoading(false);
        setHasMore(false);
      }
    });
  };

  const playlistIds = useCreation(
    () => playlistDetail?.trackIds?.map((item: any) => item.id),
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
    playlistDetail,
    loading,
    playlistIds,
  };
};
