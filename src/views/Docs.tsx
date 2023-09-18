import { TooltipCard } from "@/components/tooltip-card";
import { Link } from "@/components/link";

// import markdown from "@docs/initialize-state-with-props.md?raw";
import markdown from "@docs/hexgate-readme.md?raw";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { materialLight as light } from "react-syntax-highlighter/dist/esm/styles/prism";
import dark from "@/style/dark-theme";
// import light from "@/style/dark-theme";
// import light from "@/style/light-theme";
import light from "@/style/lightest-theme";

// import {
//   // oneDark as dark,
//   oneLight as light,
// } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/hook";
import { cn } from "@/lib/utils";

export function Docs() {
  const [style, setStyle] = useState(light);
  const { theme, prefersDark } = useTheme();

  useLayoutEffect(() => {
    if (theme === "system") {
      setStyle(prefersDark ? dark : (light as any));
    } else {
      setStyle(theme === "dark" ? dark : (light as any));
    }
  }, [theme, prefersDark]);

  return (
    <div className="relative p-5">
      <section className="flex flex-col items-start justify-center gap-2 container w-fit mx-auto">
        <h1 className="text-7xl pb-4">Markdown</h1>
        <div className="text-lg text-start text-muted-foreground/90 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-ellipsis mx-auto pl-0.5">
          todo
        </div>
        <Markdown
          className="w-full prose-lg prose-pre:bg-transparent prose-pre:p-0"
          remarkPlugins={[remarkGfm]}
          //   className="prose
          // prose-h1:text-6xl
          // prose-h2:text-4xl prose-h2:text-foreground
          // prose-h3:text-3xl prose-h3:text-secondary-foreground
          // prose-h4:text-2xl prose-h4:text-muted-foreground/90
          // text-foreground
          // prose-a:text-foreground prose-a:text-indigo-400"
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  style={style as any}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers={true}
                  customStyle={{
                    borderRadius: "0.75em",
                    border: "1px solid #bbd8e629",
                    paddingRight: "2em",
                  }}
                  children={String(children).replace(/\n$/, "")}
                  {...props}
                />
              ) : (
                <code
                  className={cn(className, "text-rose-400 font-code")}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </Markdown>
      </section>
    </div>
  );
}
