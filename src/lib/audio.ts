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

const startANewTrack = (url: string) => {
  globalAudio.src = url;
  globalAudio.load();
  globalAudio.play();
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

const jumpTo = (time: number) => {
  globalAudio.currentTime = time;
};

export const GlobalAudioFunc = {
  togglePlay: withCallback(togglePlay),
  startANewTrack: withCallback(startANewTrack),
  registerUpdateCurrentTime,
  registerUpdateVolume,
  jumpTo: withCallback(jumpTo),
  registerOnEnded,
};
