import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { ClassName } from "@/types";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeftToLine, MenuIcon } from "lucide-react";

export function ToggleDocSidebar({
  children,
  className,
}: {
  className?: ClassName;
  children?: React.ReactNode;
}) {
  const { isOpen, toggle } = useSidebarStore();
  const shouldShowButton = useRouter().state.matchIds.includes("/docs");
  if (!shouldShowButton) return null;
  return (
    <Button
      className={cn("relative w-fit gap-2 px-2 transition-all", className)}
      onClick={toggle}
      variant="ghost"
      size="sm"
    >
      {children}
      <div className="relative aspect-square h-5">
        <MenuIcon
          className={cn(
            "absolute w-full h-full stroke-current scale-90 transition",
            {
              "transform rotate-90 opacity-0": isOpen,
              "transform rotate-0 opacity-100": !isOpen,
            }
          )}
        />
        <ArrowLeftToLine
          className={cn(
            "absolute w-full h-full stroke-current scale-90 transition",
            {
              "transform rotate-90 opacity-0": !isOpen,
              "transform rotate-0 opacity-80": isOpen,
            }
          )}
        />
      </div>
    </Button>
  );
}
