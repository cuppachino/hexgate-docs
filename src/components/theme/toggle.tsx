import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useTheme } from "@/components/theme/hook";

export function Toggle() {
  const { theme, cycleTheme } = useTheme();
  return (
    <div>
      <Button variant="outline" size="default" onClick={cycleTheme}>
        {theme === "system" ? (
          "System"
        ) : (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </>
        )}
      </Button>
    </div>
  );
}
