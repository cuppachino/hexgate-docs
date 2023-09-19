import { Router } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { homeRoute } from "./home";
import { apiRoute } from "./api";
import { notFoundRoute } from "./not-found";

export const routeTree = rootRoute.addChildren([
  homeRoute,
  apiRoute,
  docsRoute,
  notFoundRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { buttonVariants } from "@/components/ui/button";
import { RootRoute, type MakeLinkPropsOptions } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import { docsRoute } from "./docs";

type MakeLinkPropsOptionsWithExternal<T> = T extends {
  to?: infer _;
  external?: true;
}
  ?
      | T
      | ({
          to: string;
          external: true;
        } & Omit<T, "to">)
  : T;

export type LinkProps = MakeLinkPropsOptionsWithExternal<
  MakeLinkPropsOptions<RootRoute> & {
    external?: true;
  }
> &
  VariantProps<typeof buttonVariants>;
