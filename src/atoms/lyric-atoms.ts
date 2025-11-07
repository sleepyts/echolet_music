import { APP_CONSTANTS } from "@/lib/consts";
import type { LyricLine } from "@/lib/types";
import { FormatUtils } from "@/lib/utils";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TrackState } from "./track-atoms";

interface LyricState {
  lyric: LyricLine[] | undefined;

  tlyric: LyricLine[] | undefined;

  romalyric: LyricLine[] | undefined;

  currentLyricIndex: number;
}

const LyricStateAtom = atomWithStorage<LyricState>(
  APP_CONSTANTS.LYRIC_STORAGE_KEY,
  {
    lyric: undefined,
    tlyric: undefined,
    romalyric: undefined,
    currentLyricIndex: 0,
  }
);

// 原始歌词
const LyricAtom = atom((get) => get(LyricStateAtom).lyric);

// 翻译歌词
const TLyricAtom = atom((get) => get(LyricStateAtom).tlyric);

// 罗马音歌词
const RomalLyricAtom = atom((get) => get(LyricStateAtom).romalyric);

// 当前歌词索引
const CurrentLyricIndexAtom = atom(
  (get) => get(LyricStateAtom).currentLyricIndex
);

// 处理API返回的歌词
const DealApiLyricAction = atom(null, (get, set, lyric: any) => {
  const lrc = lyric.lrc;
  const tlyric = lyric.tlyric;
  const romalrc = lyric.romalrc;

  if (lrc && lrc.lyric !== "") {
    set(LyricStateAtom, (prev) => ({
      ...prev,
      lyric: FormatUtils.parseLrc(lrc.lyric),
    }));
  }
  if (tlyric && tlyric.lyric !== "") {
    set(LyricStateAtom, (prev) => ({
      ...prev,
      tlyric: FormatUtils.parseLrc(tlyric.lyric),
    }));
  }
  if (romalrc && romalrc.lyric !== "") {
    set(LyricStateAtom, (prev) => ({
      ...prev,
      romalyric: FormatUtils.parseLrc(romalrc.lyric),
    }));
  }
});
const SetRencentLyricIndexAction = atom(null, (get, set) => {
  const lyric = get(LyricAtom);
  const currentTime = get(TrackState.CurrentTrackTime);

  if (!lyric) {
    set(LyricStateAtom, (prev) => ({
      ...prev,
      currentLyricIndex: 0,
    }));
    return;
  }
  if (lyric[lyric.length - 1].time <= currentTime) {
    set(LyricStateAtom, (prev) => ({
      ...prev,
      currentLyricIndex: lyric.length - 1,
    }));
    return;
  }
  const index =
    lyric.findIndex((line: LyricLine, i: number) => {
      return (
        currentTime <= line.time && (i === 0 || currentTime > lyric[i - 1].time)
      );
    }) - 1;
  set(LyricStateAtom, (prev) => ({
    ...prev,
    currentLyricIndex: index,
  }));
});
export const LyricState = {
  Lyric: LyricAtom,
  TLyric: TLyricAtom,
  RomalLyric: RomalLyricAtom,
  CurrentLyricIndex: CurrentLyricIndexAtom,

  DealApiLyric: DealApiLyricAction,
  SetRencentLyricIndex: SetRencentLyricIndexAction,
};
