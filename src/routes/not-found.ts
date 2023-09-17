import { getRootRoute as getParentRoute } from "@/routes/root";
import { NotFound } from "@/views/NotFound";
import { Route } from "@tanstack/react-router";

export const notFoundRoute = new Route({
  getParentRoute,
  path: "*",
  component: NotFound,
});
