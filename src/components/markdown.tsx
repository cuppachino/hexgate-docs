import dark from "../style/dark-theme";
import light from "../style/light-bold";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

import { useTheme } from "../components/theme/hook";
import { cn } from "../lib/utils";
import { useLayoutEffect, useState } from "react";
import rehypeRaw from "rehype-raw";

export function Markdown({ markdown }: { markdown: string }) {
  const {
    theme: { actual: theme },
  } = useTheme();
  const [style, setStyle] = useState(() => (theme === "dark" ? dark : light));
  useLayoutEffect(() => {
    setStyle(theme === "dark" ? dark : light);
  }, [theme]);

  return (
    <ReactMarkdown
      className="w-full prose dark:prose-invert
                text-lg text-muted-foreground
                max-w-screen-2xl
                prose-pre:bg-transparent prose-pre:p-0
                prose-code:before:hidden prose-code:after:hidden
                pb-10
                "
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw as any]}
      components={{
        a(props) {
          return (
            <a
              className="text-foreground underline hover:underline hover:text-vibe-blue"
              {...props}
            />
          );
        },
        img(props) {
          return (
            <img
              className="mx-auto"
              style={{ maxWidth: "100%", display: "block" }}
              {...props}
            />
          );
        },
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div>
              <SyntaxHighlighter
                style={style as any}
                language={match[1]}
                showLineNumbers={true}
                customStyle={{
                  borderRadius: "0.75em",
                  border: "1px solid #bbd8e629",
                  width: "100%",
                  margin: 0,
                }}
                children={String(children).replace(/\n$/, "")}
                {...props}
              />
            </div>
          ) : (
            <code
              className={cn(
                className,
                "bg-secondary rounded px-1.5 py-0.5 mx-0.5 font-normal font-code"
              )}
              {...props}
            >
              {String(children).replace(/`/g, "")}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
