import { http } from "..";

const getTrackDetail = (ids: number[]) => {
  return http
    .get("song/detail", {
      searchParams: {
        ids: ids.join(","),
      },
    })
    .json();
};

const getMusicUrl = (ids: number[], level: string = "standard") => {
  return http
    .get("song/url/v1", {
      searchParams: {
        id: ids.join(","),
        level: level,
      },
    })
    .json();
};

const getLyric = (id: number) => {
  return http
    .get("lyric", {
      searchParams: {
        id: id,
      },
    })
    .json();
};
export const TrackApis = {
  getTrackDetail,
  getMusicUrl,
  getLyric,
};
