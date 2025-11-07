import { LyricState } from "@/atoms/lyric-atoms";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

export const usePlayerDetailRightContentModel = () => {
  const currentLyricIndex = useAtomValue(LyricState.CurrentLyricIndex);
  const lyricsRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = lyricsRefs.current[currentLyricIndex ?? 0];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentLyricIndex]);

  return {
    lyricsRefs,
    currentLyricIndex,
  };
};
