import { getRootRoute as getParentRoute } from "@/routes/root";
import { Api } from "@/views/Api";
import { Route } from "@tanstack/react-router";

export const apiRoute = new Route({
  getParentRoute,
  path: "/api",
  component: Api,
});
