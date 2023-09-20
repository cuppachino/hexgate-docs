import { createContext, useEffect, useState } from "react";

export type Variant = "dark" | "light" | "system";

export type Theme = {
  variant: Variant;
  prefersDark: boolean;
  actual: Omit<Variant, "system">;
};

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const actual = (variant: Variant) => {
  if (variant === "system") {
    return prefersDark() ? "dark" : "light";
  }

  return variant;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultVariant?: Variant;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Variant) => void;
  cycleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: {
    variant: "system",
    prefersDark: prefersDark(),
    actual: prefersDark() ? "dark" : "light",
  },
  setTheme: () => null,
  cycleTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultVariant = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => ({
    variant: (localStorage.getItem(storageKey) as Variant) || defaultVariant,
    prefersDark: prefersDark(),
    actual: actual(
      (localStorage.getItem(storageKey) as Variant) || defaultVariant
    ),
  }));

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme.variant === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const systemTheme = prefersDark ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme.variant);
  }, [theme]);

  const value = {
    theme,
    setTheme: (variant: Variant) => {
      localStorage.setItem(storageKey, variant);
      setTheme({
        variant,
        actual: actual(variant),
        prefersDark: prefersDark(),
      });
    },
    cycleTheme: () => {
      switch (theme.variant) {
        case "light": {
          value.setTheme("system");
          break;
        }
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
