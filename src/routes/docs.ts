import { getRootRoute as getParentRoute } from "@/routes/root";
import { Docs } from "@/views/Docs";
import { Route } from "@tanstack/react-router";

export const docsRoute = new Route({
  getParentRoute,
  path: "/docs",
  component: Docs,
});
