import markdown from "@docs/introduction.md?raw";

import { Markdown } from "@/components/markdown";
export function Docs() {
  return <Markdown markdown={markdown} />;
}
