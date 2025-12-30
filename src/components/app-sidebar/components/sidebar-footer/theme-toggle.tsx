import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { themeProviderAtom } from "@/components/theme-provider";

export function ModeToggle() {
  const [themeProviderState, setThemeProviderState] =
    useAtom(themeProviderAtom);

  return (
    <Button
      variant="click-shrink"
      size="icon"
      onClick={() =>
        setThemeProviderState({
          theme: themeProviderState.theme === "light" ? "dark" : "light",
        })
      }
    >
      {themeProviderState.theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-none" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-none" />
      )}
    </Button>
  );
}
