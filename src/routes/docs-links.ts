export const docsLinks = [
  {
    "group": "getting started",
    "routes": [
      {
        "name": "Introduction",
        "importPath": "getting-started/introduction.md",
        "path": "introduction",
        "bodyBegin": 72,
        "group": "getting started",
        "order": 0,
        "description": "How to use Hexgate"
      },
      {
        "name": "Installation",
        "importPath": "getting-started/installation.md",
        "path": "installation",
        "bodyBegin": 70,
        "group": "getting started",
        "order": 1,
        "description": "Available on NPM"
      },
      {
        "name": "Quickstart",
        "importPath": "getting-started/quick-start.md",
        "path": "quick-start",
        "bodyBegin": 93,
        "group": "getting started",
        "order": 2,
        "description": "Create a simple application using Hexgate"
      },
      {
        "name": "Contributing",
        "importPath": "getting-started/contribute.md",
        "path": "contribute",
        "bodyBegin": 82,
        "group": "getting started",
        "order": 4,
        "description": "How to contribute to Hexgate"
      },
      {
        "name": "RAW README",
        "importPath": "getting-started/hexgate-readme.md",
        "path": "hexgate-readme",
        "bodyBegin": 82,
        "group": "getting started",
        "order": 99,
        "description": "Website is under construction"
      }
    ]
  },
  {
    "group": "guide",
    "routes": [
      {
        "name": "Authentication",
        "importPath": "guide/authentication.md",
        "path": "authentication",
        "bodyBegin": 122,
        "group": "guide",
        "order": 0,
        "description": "Extracting authentication tokens from the League of Legends client"
      }
    ]
  }
] as const;

export type RoutePath = typeof docsLinks[number]["routes"][number]["path"];
