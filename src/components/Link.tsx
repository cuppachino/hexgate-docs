import { Link as RouterLink } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LinkProps } from "@/routes";
import { buttonVariants } from "./ui/button";

export function Link({
  to,
  className,
  children,
  size = "sm",
  variant = "outline",
  external,
  ...props
}: LinkProps) {
  return (
    <RouterLink
      {...(external
        ? {
            target: "_blank",
            onClick(e) {
              e.preventDefault();
              window.open(to, "_blank");
            },
          }
        : { to })}
      {...props}
      activeProps={{
        className: cn(
          buttonVariants({ variant, size, className }),
          "font-light leading-2"
        ),
      }}
      className={cn(
        buttonVariants({ variant, size, className }),
        "font-light leading-2"
      )}
    >
      {children}
    </RouterLink>
  );
}
