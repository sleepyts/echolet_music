import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createRef } from "react";
import type { NavigateFunction } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigatorRef = createRef<NavigateFunction>();

export function go(path: string) {
  if (navigatorRef.current) {
    navigatorRef.current(path);
  }
}

export function fromMsToTimeString(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function fromMsToSecond(ms: number) {
  return Math.floor(ms / 1000);
}
