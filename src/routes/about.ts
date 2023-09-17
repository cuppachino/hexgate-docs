import { getRootRoute as getParentRoute } from "@/routes/root";
import { About } from "@/views/About";
import { Route } from "@tanstack/react-router";

export const aboutRoute = new Route({
  getParentRoute,
  path: "/about",
  component: About,
});
