import { Button } from "./ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export type TooltipCardProps = {
  text: string;
  name?: string;
  to?: string;
  children?: React.ReactNode;
  className?: ClassName;
} & (
  | { img: string; fallback: string }
  | {
      img?: undefined;
      fallback?: undefined;
    }
);

export function TooltipCard({
  className,
  text,
  name = text,
  children,
  img,
  to,
  fallback,
}: TooltipCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          className={className}
          variant="link"
          {...(to
            ? {
                onClick(e) {
                  e.preventDefault();
                  window.open(to, "_blank");
                },
              }
            : {})}
        >
          {text}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          {!!img && (
            <Avatar>
              <AvatarImage src={img} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            {children}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
