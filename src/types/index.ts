export type * from "./option";

export type PropType<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T>;

export type ClassName<T = Element> = React.HTMLAttributes<T>["className"];
