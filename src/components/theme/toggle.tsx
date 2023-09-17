import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useTheme } from "@/components/theme/hook";
import { cn } from "@/lib/utils";

export function Toggle() {
  const { theme, cycleTheme } = useTheme();
  return (
    <Button variant="outline" size="sm" onClick={cycleTheme}>
      {/* {theme === "system" && theme} */}

      <span
        className={cn("transition-all", {
          "rotate-0 scale-100 w-[2rem]": theme === "system",
          "-rotate-45 scale-0 w-0": theme !== "system",
        })}
      >
        System
      </span>

      <Sun
        className={cn("h-[1.2rem] w-[1.2rem] transition-all", {
          "rotate-0 scale-100  dark:-rotate-90 dark:scale-0":
            theme !== "system",
          "rotate-90 scale-0": theme === "system",
        })}
      />
      <Moon
        className={cn("absolute h-[1.2rem] w-[1.2rem] transition-all", {
          "rotate-90 scale-0 dark:rotate-0 dark:scale-100": theme !== "system",
          "rotate-90 scale-0": theme === "system",
        })}
      />
    </Button>
  );
}
