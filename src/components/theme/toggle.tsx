import { Moon, Sun } from "lucide-react";
import { Button } from "../../components/ui/button/button";
import { useTheme } from "../../components/theme/hook";
import { cn } from "../../lib/utils";

export function Toggle() {
  const {
    theme: { variant },
    cycleTheme,
  } = useTheme();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className={cn("select-none transition-all duration-150 ", {
        "w-[4.5rem]": variant === "system",
        "w-10": variant !== "system",
      })}
    >
      {/* {theme === "system" && theme} */}

      <span
        className={cn("absolute transition-opacity duration-100", {
          "scale-50 opacity-0": variant !== "system",
          "rotate-0 scale-100": variant === "system",
        })}
      >
        System
      </span>

      <Sun
        className={cn("h-[1.2rem] w-[1.2rem] transition-all ", {
          "rotate-0 scale-100 dark:-rotate-90 dark:scale-0":
            variant !== "system",
          "-rotate-90 scale-0 opacity-0": variant === "system",
        })}
      />
      <Moon
        className={cn("absolute h-[1.2rem] w-[1.2rem] transition-all ", {
          "rotate-90 scale-0 dark:rotate-0 dark:scale-100":
            variant !== "system",
          "rotate-90 scale-0 opacity-0": variant === "system",
        })}
      />
    </Button>
  );
}
