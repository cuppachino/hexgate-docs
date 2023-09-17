/// <reference types="vite/client" />

type PropType<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T>;

type ClassName<T = Element> = React.HTMLAttributes<T>["className"];
