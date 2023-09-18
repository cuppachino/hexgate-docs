import { Link as RouterLink } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LinkProps } from "@/routes";
import { buttonVariants } from "./ui/button";

export function Link({
  to,
  className,
  activeProps,
  children,
  size = "sm",
  variant = "outline",
  external,
  ...props
}: LinkProps) {
  const buttonClasses = buttonVariants({ variant, size, className });
  return (
    <RouterLink
      {...(external
        ? {
            target: "_blank",
            onClick(e) {
              e.preventDefault();
              window.open(to, "_blank", "noopener noreferrer");
            },
          }
        : { to })}
      {...props}
      activeProps={{
        ...activeProps,
        className: cn(
          buttonClasses,
          activeProps?.["className" as keyof typeof activeProps],
          "select-none"
        ),
      }}
      className={cn(buttonClasses, className, "select-none")}
    >
      {children}
    </RouterLink>
  );
}
