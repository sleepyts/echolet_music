import { http } from "..";
import type { RecommendPlaylistResp } from "../modal";

/**
 * 获取推荐歌单
 * @param limit 歌单数量 默认12
 * @param timestamp 时间戳 禁止缓存
 */
function getUserRecommendPlaylist(
  limit: number = 12,
  timestamp: number = Date.now()
): Promise<RecommendPlaylistResp> {
  return http
    .get<RecommendPlaylistResp>("personalized", {
      searchParams: { limit, timestamp },
    })
    .json();
}

const getUserLikePlaylist = (uid: number) => {
  return http
    .get<RecommendPlaylistResp>("likelist", {
      searchParams: { uid },
    })
    .json();
};

const getUserPlaylist = (
  uid: number,
  limit: number = 30,
  offset: number = 0
) => {
  return http
    .get("user/playlist", {
      searchParams: { uid, limit, offset },
    })
    .json();
};

const getPlaylistDetail = (id: number) => {
  return http
    .get("playlist/detail", {
      searchParams: { id },
    })
    .json();
};

const getPlaylistTrack = (
  id: number,
  limit: number = 30,
  offset: number = 0
) => {
  return http
    .get("playlist/track/all", {
      searchParams: { id, limit, offset },
    })
    .json();
};

const getRecommendResource = () => {
  return http
    .get("homepage/block/page", {
      searchParams: { refresh: true, timestamp: Date.now() },
    })
    .json();
};
export const PlaylistApis = {
  getUserRecommendPlaylist,
  getUserLikePlaylist,
  getUserPlaylist,
  getPlaylistDetail,
  getPlaylistTrack,
  getRecommendResource,
};
