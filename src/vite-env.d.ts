/// <reference types="vite/client" />

declare module "*.md" {
  const content: string;
  export default content;
}

type PropType<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T>;

type ClassName<T = Element> = React.HTMLAttributes<T>["className"];
