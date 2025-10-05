import { TrackState } from "@/atoms/track-atoms";
import { useMount } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";

export const useModal = () => {
  const GlobalAudio = useAtomValue(TrackState.GlobalAudio);
  const OnAudioTimeUpdate = useSetAtom(TrackState.OnAudioTimeChange);

  useMount(() => {
    if (!GlobalAudio) return;

    let lastTime = 0;
    const THROTTLE_GAP = 1000;

    const handleTimeUpdate = () => {
      const now = performance.now();
      if (now - lastTime > THROTTLE_GAP) {
        lastTime = now;
        OnAudioTimeUpdate();
      }
    };

    // 用 requestAnimationFrame 确保节流执行在浏览器渲染节奏内
    let ticking = false;
    GlobalAudio.ontimeupdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleTimeUpdate();
          ticking = false;
        });
      }
    };
  });
};
