import { Router } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { homeRoute } from "./home";
import { aboutRoute } from "./about";

export const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
