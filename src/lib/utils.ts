import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createRef } from "react";
import type { NavigateFunction } from "react-router-dom";
import { APP_CONSTANTS } from "./consts";

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
  fromMsToSecond,
  fromNumberToMillionOrBillion,
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
