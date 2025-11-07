const globalAudio = new Audio();
const withCallback = <T extends any[], R>(originalFunc: (...args: T) => R) => {
  type ArgsWithCallback = T extends [...infer Rest]
    ? [...Rest, ((result: R) => void)?]
    : never;

  const wrappedFunc = (...args: ArgsWithCallback): R => {
    const lastArg = args[args.length - 1];
    const callback =
      typeof lastArg === "function"
        ? (lastArg as (result: R) => void)
        : undefined;

    const originalArgs = callback
      ? (args.slice(0, -1) as T)
      : (args as unknown as T);

    const result = originalFunc(...originalArgs);

    if (callback) {
      callback(result);
    }

    return result;
  };

  return wrappedFunc;
};

const togglePlay = () => {
  if (globalAudio.paused) {
    globalAudio.play();
  } else {
    globalAudio.pause();
  }
};

const startANewTrack = async (url: string) => {
  jumpTo(0);
  globalAudio.pause();
  loadUrl(url);
  await globalAudio.play();
};

const loadUrl = (url: string) => {
  globalAudio.load();
  globalAudio.src = url;
};

const registerUpdateCurrentTime = (callback: (currentTime: number) => void) => {
  globalAudio.addEventListener("timeupdate", () => {
    callback(globalAudio.currentTime);
  });
};

const registerUpdateVolume = (callback: (volume: number) => void) => {
  globalAudio.addEventListener("volumechange", () => {
    callback(globalAudio.volume);
  });
};

const registerOnEnded = (callback: () => void) => {
  globalAudio.addEventListener("ended", callback);
};

const registerOnError = (callback: () => void) => {
  globalAudio.addEventListener("error", callback);
};
const jumpTo = (time: number) => {
  globalAudio.currentTime = time;
};

export const GlobalAudioFunc = {
  togglePlay: withCallback(togglePlay),
  startANewTrack: withCallback(startANewTrack),
  jumpTo: withCallback(jumpTo),
  loadUrl: withCallback(loadUrl),

  registerOnEnded,
  registerOnError,
  registerUpdateCurrentTime,
  registerUpdateVolume,
};
