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
