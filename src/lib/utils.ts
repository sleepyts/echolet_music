import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createRef } from "react";
import type { NavigateFunction } from "react-router-dom";
import { APP_CONSTANTS } from "./consts";
import type { LyricLine } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigatorRef = createRef<NavigateFunction>();

function go(path: string) {
  if (navigatorRef.current) {
    navigatorRef.current(path);
  }
}

// ====================================
function fromMsToTimeString(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function fromSsToTimeString(ss: number) {
  return fromMsToTimeString(ss * 1000);
}

function fromMsToSecond(ms: number) {
  return Math.floor(ms / 1000);
}

function fromNumberToMillionOrBillion(num?: number) {
  if (!num) {
    return "";
  }
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(2)}亿`;
  } else if (num >= 10000) {
    return `${(num / 10000).toFixed(2)}万`;
  } else {
    return num.toString();
  }
}

/**
 * 歌词转换函数
 * "[00:00.000] 作词 : 张国祥 => { time: 歌词时间，单位秒，text: 歌词内容}
 * [00:01.000] 作曲 : 汤小康 => {time: 1.00, text: "作曲 : 汤小康"}
 * [00:04.050] => {time: 4.05, text: "作曲 : 汤小康"}
 * [00:12.570]难以忘记初次见你  => {time: 12.57, text: "难以忘记初次见你"}
 * @param raw
 */
function parseLrc(raw: string): LyricLine[] {
  const timeTagRegex = /\[(\d{2})[:.](\d{2})(?:[:.](\d{2,3}))?]/g;
  const lines = raw.split("\n");
  const result: LyricLine[] = [];

  for (const line of lines) {
    const matches = [...line.matchAll(timeTagRegex)];
    const text = line.replace(timeTagRegex, "").trim();

    // ❗过滤掉没有文字的行
    if (!text || matches.length === 0) continue;

    for (const match of matches) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const millis = match[3] ? parseInt(match[3].padEnd(3, "0")) : 0;
      const time = minutes * 60 + seconds + millis / 1000;

      result.push({
        time,
        text,
      });
    }
  }

  return result.sort((a, b) => a.time - b.time);
}
// ===================================================
function scrollAppMainContainerToTop(smooth?: boolean) {
  document
    .getElementById(APP_CONSTANTS.APP_MAIN_CONTAINER_ID)
    ?.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

// ===================================================
function writeLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

function readLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

export const FormatUtils = {
  fromMsToTimeString,
  fromSsToTimeString,
  fromMsToSecond,
  fromNumberToMillionOrBillion,
  parseLrc,
};

export const DomUtils = {
  scrollAppMainContainerToTop,
};

export const RouteUtils = {
  go,
};

export const LocalStorageUtils = {
  writeLocalStorage,
  readLocalStorage,
};
