import { Root } from "@/views/Root";
import { RootRoute } from "@tanstack/react-router";

export const rootRoute = new RootRoute({
  component: Root,
});

export const getRootRoute = () => rootRoute;
