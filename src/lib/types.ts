export type Pagination = {
  limit: number;
  offset: number;
};

/**
 * 歌词行结构，time为哪一秒，text为歌词内容
 */
export type LyricLine = {
  time: number;
  text: string;
};

/**
 * 搜索类型
 */
export enum SearchType {
  Track = 1,
  Album = 10,
  Artist = 100,
  Playlist = 1000,
  User = 1002,
  MV = 1004,
  Lyric = 1006,
  Video = 1014,
  Comprehensive = 1018,
  Voice = 2000,
}
