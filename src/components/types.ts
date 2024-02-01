import { Child } from "hono/middleware";

export type ElementType = keyof Hono.IntrinsicElements;

export type ElementProps<Root extends ElementType> =
  Hono.IntrinsicElements[Root];

export type PolymorphicProps<
  Root extends ElementType,
  Props = { children?: Child },
> = ElementProps<Root> &
  Props & {
    children?: Child;
    as?: Root;
  };
