import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  prefersDark: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
};

const initialState: ThemeProviderState = {
  prefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  theme: "system",
  setTheme: () => null,
  cycleTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [prefersDark, setPrefersDark] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const systemTheme = prefersDark ? "dark" : "light";

      root.classList.add(systemTheme);
      setPrefersDark(prefersDark);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    prefersDark,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    cycleTheme: () => {
      switch (theme) {
        case "light":
          value.setTheme("system");
          break;
        case "system":
          value.setTheme("dark");
          break;
        case "dark":
          value.setTheme("light");
          break;
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
