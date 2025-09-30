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
export const TrackApis = {
  getTrackDetail,
  getMusicUrl,
};
