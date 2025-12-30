import { appStore } from "@/lib/store";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderState = {
  theme: Theme;
};

const initialState: ThemeProviderState = {
  theme: "light",
};

const THEME_STORAGE_KEY = "ui-theme";
export const themeProviderAtom = atomWithStorage<ThemeProviderState>(
  THEME_STORAGE_KEY,
  initialState,
  {
    getItem: async (key: string, defaultValue: ThemeProviderState) => {
      return (await appStore.get(key)) || defaultValue;
    },
    setItem: async (key: string, value: ThemeProviderState) => {
      await appStore.set(key, value);
    },
    removeItem: async (key: string) => {
      await appStore.delete(key);
    },
  }
);
export function useThemeProvider() {
  const [themeProviderState] = useAtom(themeProviderAtom);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (themeProviderState.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
    } else {
      root.classList.add(themeProviderState.theme);
    }

    getCurrentWindow().setTheme(
      themeProviderState.theme === "system" ? null : themeProviderState.theme
    );
  }, [themeProviderState]);
}
