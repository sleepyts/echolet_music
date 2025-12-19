import { useAtomValue } from "jotai";
import { useLyric } from "../hooks/use-lyric";
import { LyricState } from "@/atoms/lyric-atoms";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { GlobalAudioFunc } from "@/lib/audio";
import { usePlayerDetailRightContentModel } from "../hooks/use-right-content-model";

const PlayerDetailRightContent = () => {
  useLyric();
  const lyric = useAtomValue(LyricState.Lyric);

  const tlyric = useAtomValue(LyricState.TLyric);
  const romaLyric = useAtomValue(LyricState.RomalLyric);

  const { lyricsRefs, currentLyricIndex } = usePlayerDetailRightContentModel();

  return (
    <div className="relative flex-1 flex flex-row items-start p-4 gap-4">
      {/* TODO: roman lyric and translate mode change button */}
      {/* <div className="flex flex-col h-full justify-center">
        {romaLyric?.length && romaLyric?.length > 0 && (
          <Button variant={"click-shrink"} className="p-2">
            音
          </Button>
        )}
        {tlyric?.length && tlyric.length > 0 && (
          <Button variant={"click-shrink"} className="p-2">
            译
          </Button>
        )}
      </div> */}

      <div className="h-full w-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col w-full h-full  gap-2">
          {lyric?.map(({ time, text }, index) => {
            return (
              <Button
                key={time}
                ref={(el) => (lyricsRefs.current[index] = el)}
                variant="ghost"
                onClick={() => {
                  GlobalAudioFunc.jumpTo(time);
                }}
                className={classNames(
                  "justify-start h-auto px-2 py-3 rounded-md transition-colors duration-300 text-left overflow-visible",
                  {
                    "bg-accent": currentLyricIndex === index,
                    // center align
                    "mt-auto": index === 0,
                    "mb-auto": index === lyric.length - 1,
                  }
                )}
              >
                <div>
                  <p
                    className={classNames(
                      "text-lg md:text-xl transition-all duration-300",
                      {
                        "font-bold": currentLyricIndex === index,
                        "font-thin": currentLyricIndex !== index,
                      }
                    )}
                  >
                    {text}
                  </p>
                  {tlyric && (
                    <p className="mt-1 text-sm md:text-base text-muted-foreground">
                      {tlyric.find((t) => t.time === time)?.text}
                    </p>
                  )}
                  {/* {romaLyric && (
                    <p className="mt-1 text-sm md:text-base text-muted-foreground">
                      {romaLyric.find((t) => t.time === time)?.text}
                    </p>
                  )} */}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailRightContent;
