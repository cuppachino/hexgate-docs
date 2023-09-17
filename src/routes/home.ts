import { getRootRoute as getParentRoute } from "@/routes/root";
import { Home } from "@/views/Home";
import { Route } from "@tanstack/react-router";

export const homeRoute = new Route({
  getParentRoute,
  path: "/",
  component: Home,
});
