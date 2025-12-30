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
  initialState
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
      return;
    }

    root.classList.add(themeProviderState.theme);

    getCurrentWindow().setTheme(themeProviderState.theme);
    localStorage.setItem(THEME_STORAGE_KEY, themeProviderState.theme);
  }, [themeProviderState]);
}
