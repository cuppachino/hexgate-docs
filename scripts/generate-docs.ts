import { Dirent } from "fs";
import fs from "fs/promises";

const TEMPLATE_BASE = `
import { getRootRoute as getParentRoute } from "@/routes/root";
import Docs from "@/views/Documentation";
import { Route } from "@tanstack/react-router";

const docsRoute = new Route({
  getParentRoute,
  path: "docs",
  component: Docs,
});

import Markdown from "@/views/Markdown";
`;

/**
 * Replaces all non-alphanumeric characters with an underscore.
 */
function stringToVariableName(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}

const createRoute = (
  name: string,
  importPath: string,
  path: string,
  bodyBegin: number,
  description: string | undefined
) => {
  const variableName = stringToVariableName(name).toLowerCase();
  const routeName = `${variableName}Route`;
  return [
    `
import ${variableName} from "@/docs/${importPath}?raw";
const ${routeName} = new Route({
  getParentRoute: () => docsRoute,
  path: "${path}",
  component: Markdown(${variableName}.slice(${bodyBegin}), "${name}"${
      description ? `, "${description}"` : ""
    }),
});
`,
    routeName,
  ] as const;
};

const EOF = `
export { docsRoute };`;

import { FrontMatter } from "./front-matter.js";

class Route {
  constructor(
    public name: string,
    public importPath: string,
    public path: string,
    public bodyBegin: number,
    public group: string,
    public order: number,
    public description: string | undefined
  ) {}
}

const getFolders = async () => {
  const files = await fs.readdir("./src/docs", { withFileTypes: true });
  const folders = files.filter((file) => !file.isFile());
  return folders;
};

const extractMarkdownFiles = async (folders: Dirent[]) => {
  const markdownFiles = await Promise.all(
    folders.map(async (folder) => {
      const files = await fs.readdir(`./src/docs/${folder.name}`, {
        withFileTypes: true,
      });
      const markdownFiles = files.filter((file) => file.name.endsWith(".md"));

      return await Promise.all(
        markdownFiles.map(async (file) => {
          const contents = await fs.readFile(
            `./src/docs/${folder.name}/${file.name}`,
            "utf-8"
          );
          const frontMatter = FrontMatter.parse(contents);
          const { title, description, order } =
            frontMatter.content as unknown as {
              title: string;
              description?: string;
              order: number;
            };
          const name = title || file.name.replace(".md", "");
          const path = file.name.replace(".md", "");
          if (typeof order !== "number") {
            throw new Error(
              `Expected order to be a number, received ${typeof order}`
            );
          }
          return new Route(
            name,
            `${folder.name}/${file.name}`,
            path,
            frontMatter.index,
            folder.name.replace(/-/g, " "),
            order,
            description
          );
        })
      );
    })
  );

  return markdownFiles.flat();
};

const folders = await getFolders();
const markdownFiles = await extractMarkdownFiles(folders);
console.log(markdownFiles);

const { routes, toAppend } = markdownFiles.reduce(
  (acc, file) => {
    const [str, variableName] = createRoute(
      file.name,
      file.importPath,
      file.path,
      file.bodyBegin,
      file.description
    );
    acc.toAppend.push(variableName);
    acc.routes.push(str);
    return acc;
  },
  {
    routes: [] as string[],
    toAppend: [] as string[],
  }
);

const output =
  TEMPLATE_BASE +
  routes.join("\n") +
  `docsRoute.addChildren([${toAppend.join(", ")}]);` +
  EOF;

await fs.writeFile("./src/routes/docs.ts", output);

const x = {} as Record<string, Route[]>;

for (const file of markdownFiles) {
  x[file.group] = x[file.group] || [];
  x[file.group].push(file);
}

const links = [] as { group: string; routes: Route[] }[];
for (const group in x) {
  links.push({
    group,
    routes: x[group].sort((a, b) => a.order - b.order),
  });
}

const linksOutput = `export const docsLinks = ${JSON.stringify(
  links,
  null,
  2
)} as const;

export type RoutePath = typeof docsLinks[number]["routes"][number]["path"];
`;

await fs.writeFile("./src/routes/docs-links.ts", linksOutput);
