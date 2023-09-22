import { Link } from "@/components/router-link";
import { Button } from "@/components/ui/button";
import { useElementSize } from "@/hooks/use-element-size";
import { cn } from "@/lib/utils";
import { ClassName, PropType } from "@/types";
import { a, config, useSpring } from "@react-spring/web";
import { Outlet } from "@tanstack/react-router";
import { ArrowRightToLine } from "lucide-react";
import { PropsWithChildren, useEffect } from "react";
import { useBreakpoint } from "use-breakpoint";

const BREAKPOINTS = { mobile: 640, desktop: 1024 };

function Sidebar({
  className,
  children,
  ...props
}: PropsWithChildren<PropType<"div">>) {
  const [ref, { width }] = useElementSize<HTMLDivElement>();

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const { isOpen, open, close } = useSidebarStore();
  const [styles, _api] = useSpring(
    () =>
      isOpen
        ? {
            to: async (next) => {
              await next({ width });
              await next({
                transform: "translateX(0%)",
                opacity: 1,
              });
              await next({ config: { frequency: 0.25 } });
            },
            from: {
              transform: "translateX(-100%)",
              opacity: 0,
              width,
            },
          }
        : {
            to: async (next) => {
              await next({
                transform: "translateX(-100%)",
                opacity: 0,
              });
              await next({
                width: 0,
              });
              await next({
                config: config.default,
              });
            },
            from: {
              transform: "translateX(0%)",
              width: 0,
            },
          },
    [isOpen, breakpoint, width]
  );

  useEffect(() => {
    if (breakpoint === "desktop") {
      open();
    } else {
      close();
    }
  }, [breakpoint, close, open]);

  useEffect(() => {}, []);

  return (
    <a.aside {...props} className={"relative flex"} style={styles}>
      <div
        ref={ref}
        className={cn("flex w-full h-full whitespace-nowrap", className)}
      >
        {children}
      </div>
    </a.aside>
  );
}

function ToggleSidebarButton({
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

import { useSidebarStore } from "@/stores/sidebar-store";

export default function View() {
  return (
    <div className="relative flex w-full h-full max-w-screen-2xl mx-auto">
      <Sidebar className="flex flex-col justify-between p-5 pt-20 border-r w-fit">
        <DocLinks />
        <ToggleSidebarButton arrowClassName="-rotate-180">
          Minimize
        </ToggleSidebarButton>
      </Sidebar>
      <section className="relative h-full w-full p-8 pt-20 overflow-auto">
        {/* <section className="relative h-full w-full p-8 pt-20 overflow-auto">
        <div className="sticky inline-flex items-center justify-start gap-2">
          <ToggleSidebarButton
            size={"sm"}
            className="w-fit -ml-6"
            classNameOpen="pointer-events-none select-none"
            arrowClassNameOpen="opacity-0 w-0 -translate-x-10"
            arrowClassNameClose="opacity-100 w-5"
          />
        </div>
        <Outlet />
      </section> */}
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
            className: "font-semibold text-primary",
          }}
          className="text-muted-foreground"
          to={to as any}
        >
          {name}
        </Link>
      </li>
    );
  }

  return (
    <section className="flex flex-col gap-4 pr-5">
      <h3 className="font-semibold capitalize">{name}</h3>
      <ul {...props} className={cn("flex flex-col", className)}>
        {children}
      </ul>
    </section>
  );
}
