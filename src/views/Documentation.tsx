import { Link } from "@/components/router-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassName, PropType } from "@/types";
import { Outlet } from "@tanstack/react-router";
import { ArrowRightToLine } from "lucide-react";
import { PropsWithChildren, useEffect } from "react";
import { useBreakpoint } from "use-breakpoint";

const BREAKPOINTS = { mobile: 640, desktop: 1024 };

import { useSidebarStore } from "@/stores/sidebar-store";

export function Sidebar({
  children,
  className,
}: PropsWithChildren<PropType<"div">>) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const { isOpen, open, close } = useSidebarStore();
  useEffect(() => {
    if (breakpoint === "desktop") {
      open();
    } else {
      close();
    }
  }, [breakpoint, close, open]);
  return (
    <aside
      className={cn("transition-all duration-200 ease-in-out", className, {
        "w-0 -translate-x-full opacity-0 px-0 scale-x-0": !isOpen,
        "w-48 md:w-64 translate-x-0 scale-x-100": isOpen,
      })}
    >
      {children}
    </aside>
  );
}

export function ToggleSidebarButton({
  children,
  className,
  classNameOpen,
  arrowClassName,
  arrowClassNameOpen,
  arrowClassNameClose,
  ...props
}: Omit<
  PropsWithChildren<
    {
      classNameOpen?: ClassName;
      arrowClassName?: ClassName;
      arrowClassNameOpen?: ClassName;
      arrowClassNameClose?: ClassName;
    } & PropType<typeof Button>
  >,
  "onClick" | "variant"
>) {
  const [isOpen, toggle] = useSidebarStore((s) => [s.isOpen, s.toggle]);
  return (
    <Button
      {...props}
      onClick={toggle}
      variant={"ghost"}
      className={cn(
        "justify-between flex w-full",
        className,
        isOpen && classNameOpen
      )}
    >
      {children}
      <ArrowRightToLine
        className={cn(
          "stoke-current flex w-5 transition-all duration-300 delay-150 ease-in-out transform",
          arrowClassName,
          isOpen ? arrowClassNameOpen : arrowClassNameClose,
          isOpen && "pointer-events-none select-none"
        )}
      />
    </Button>
  );
}

import { RoutePath, docsLinks } from "@/routes/docs-links";
import { ToggleDocSidebar } from "@/features/siderbar/toggle-sidebar-top";

function DocLinks() {
  return (
    <div className="flex flex-col gap-4">
      {docsLinks.map((group) => (
        <ListNode name={group.group} key={`doc-link-group:${group.group}`}>
          {group.routes.map((route) => (
            <ListNode
              key={`doc-link-group:${group.group}-route:${route.name}`}
              name={route.name}
              to={route.path}
            />
          ))}
        </ListNode>
      ))}
    </div>
  );
}

export default function View() {
  return (
    <div className="relative flex w-full h-full max-w-screen-2xl mx-auto">
      <Sidebar className="sticky left-0 inset-y-0 flex flex-col justify-between gap-4 p-5 pt-[4.5rem] border-r z-10 will-change-auto">
        <DocLinks />
        <ToggleDocSidebar className="w-full justify-end flex-row-reverse">
          Minimize
        </ToggleDocSidebar>
      </Sidebar>
      <section className="relative flex flex-col w-full h-full mx-auto p-8 pt-20 overflow-auto will-change-auto ">
        <Outlet />
      </section>
    </div>
  );
}

interface ListNodeProps {
  children?: ListNodeElement[];
  name: string;
  to?: RoutePath;
}

type ListNodeElement =
  | React.ReactElement<ListNodeProps>
  | React.ReactElement<ListNodeProps>[];

function ListNode({
  to,
  name,
  children,
  className,
  ...props
}: ListNodeProps & PropType<"li"> & PropType<"ul">) {
  if (!children) {
    return (
      <li {...props} className={cn("flex items-center", className)}>
        <Link
          from={"docs" as "/"}
          variant={"link"}
          activeProps={{
            className: "font-semibold text-primary underline",
          }}
          className="whitespace-nowrap text-muted-foreground transition duration-150"
          to={to as any}
        >
          {name}
        </Link>
      </li>
    );
  }

  return (
    <section className="flex flex-col gap-2 pr-5">
      <h3 className="whitespace-nowrap text-xs font-semibold capitalize text-secondary-foreground">
        {name}
      </h3>
      <ul {...props} className={cn("flex flex-col", className)}>
        {children}
      </ul>
    </section>
  );
}
