
import { getRootRoute as getParentRoute } from "@/routes/root";
import Docs from "@/views/Documentation";
import { Route } from "@tanstack/react-router";

const docsRoute = new Route({
  getParentRoute,
  path: "docs",
  component: Docs,
});

import Markdown from "@/views/Markdown";

import contributing from "@/docs/getting-started/contribute.md?raw";
const contributingRoute = new Route({
  getParentRoute: () => docsRoute,
  path: "contribute",
  component: Markdown(contributing.slice(82), "Contributing", "How to contribute to Hexgate"),
});


import raw_readme from "@/docs/getting-started/hexgate-readme.md?raw";
const raw_readmeRoute = new Route({
  getParentRoute: () => docsRoute,
  path: "hexgate-readme",
  component: Markdown(raw_readme.slice(82), "RAW README", "Website is under construction"),
});


import installation from "@/docs/getting-started/installation.md?raw";
const installationRoute = new Route({
  getParentRoute: () => docsRoute,
  path: "installation",
  component: Markdown(installation.slice(70), "Installation", "Available on NPM"),
});


import introduction from "@/docs/getting-started/introduction.md?raw";
const introductionRoute = new Route({
  getParentRoute: () => docsRoute,
  path: "introduction",
  component: Markdown(introduction.slice(72), "Introduction", "How to use Hexgate"),
});


import quickstart from "@/docs/getting-started/quick-start.md?raw";
const quickstartRoute = new Route({
  getParentRoute: () => docsRoute,
  path: "quick-start",
  component: Markdown(quickstart.slice(93), "Quickstart", "Create a simple application using Hexgate"),
});


import authentication from "@/docs/guide/authentication.md?raw";
const authenticationRoute = new Route({
  getParentRoute: () => docsRoute,
  path: "authentication",
  component: Markdown(authentication.slice(122), "Authentication", "Extracting authentication tokens from the League of Legends client"),
});
docsRoute.addChildren([contributingRoute, raw_readmeRoute, installationRoute, introductionRoute, quickstartRoute, authenticationRoute]);
export { docsRoute };