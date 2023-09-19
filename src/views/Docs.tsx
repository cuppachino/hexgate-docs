import markdown from "@docs/introduction.md?raw";

import dark from "../style/dark-theme";
import light from "../style/light-bold";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

import { useTheme } from "../components/theme/hook";
import { cn } from "../lib/utils";
import { useLayoutEffect, useState } from "react";

export function Docs() {
  const { theme, prefersDark } = useTheme();
  const [style, setStyle] = useState(prefersDark ? dark : (light as any));

  useLayoutEffect(() => {
    if (theme === "system") {
      setStyle(prefersDark ? dark : (light as any));
    } else {
      setStyle(theme === "dark" ? dark : (light as any));
    }
  }, [theme, prefersDark]);

  return (
    <div className="w-full h-full relative">
      <Markdown
        className="w-full prose dark:prose-invert
                text-lg text-muted-foreground
                max-w-screen-2xl
                prose-pre:bg-transparent prose-pre:p-0
                prose-code:before:hidden prose-code:after:hidden
                mx-auto py-10 px-4 md:px-6 lg:p-10
                "
        // max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl
        remarkPlugins={[remarkGfm]}
        components={{
          a(props) {
            return (
              <a
                className="text-foreground underline hover:underline hover:text-vibe-blue"
                {...props}
              />
            );
          },
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <div>
                {/* <label className="text-sm text-muted-foreground uppercase border rounded px-1 py-0.5 mx-2">
                  {match[1]}
                </label> */}
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
                {/* remove first and last backticks */}
                {String(children).replace(/`/g, "")}
              </code>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
