import { TrackApis } from "@/apis/track";
import { LyricState } from "@/atoms/lyric-atoms";
import { TrackState } from "@/atoms/track-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export const useLyric = () => {
  const currentTrackId = useAtomValue(TrackState.CurrentTrackId);
  const dealApiLyric = useSetAtom(LyricState.DealApiLyric);

  useEffect(() => {
    TrackApis.getLyric(currentTrackId).then((res: any) => {
      console.log(res);
      dealApiLyric(res);
    });
  }, [currentTrackId]);
};
