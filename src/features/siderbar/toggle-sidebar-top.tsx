import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeftToLine, MenuIcon } from "lucide-react";

export function ToggleDocSidebar() {
  const { isOpen, toggle } = useSidebarStore();
  const shouldShowButton = useRouter().state.matchIds.includes("/docs");
  if (!shouldShowButton) return null;
  return (
    <Button
      className={cn("relative px-2 transition-all w-[2.5rem]", {
        "opacity-100 ": isOpen,
        "opacity-100": !isOpen,
      })}
      onClick={toggle}
      variant="ghost"
      size="sm"
    >
      <MenuIcon
        className={cn(
          "absolute w-5 h-5 stroke-current origin-bottom-left transition",
          {
            "transform rotate-90 opacity-0": isOpen,
            "transform rotate-0 opacity-100": !isOpen,
          }
        )}
      />
      <ArrowLeftToLine
        className={cn(
          "absolute w-5 h-5 stroke-current origin-bottom-left transition",
          {
            "transform rotate-90 opacity-0": !isOpen,
            "transform rotate-0 opacity-100": isOpen,
          }
        )}
      />
    </Button>
  );
}
