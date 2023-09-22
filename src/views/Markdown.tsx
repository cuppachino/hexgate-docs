import { Markdown } from "@/components/markdown";

export default function markdownComponent(
  markdown: string,
  title: string,
  description?: string
) {
  return () => (
    <div className="relative w-full h-full gap-5 flex flex-col">
      <h1 className="">{title}</h1>
      {!!description && <h2 className="">{description}</h2>}
      <Markdown markdown={markdown} />
    </div>
  );
}
