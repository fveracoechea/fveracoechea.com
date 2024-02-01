import clsx from "npm:clsx";
import { ElementType, PolymorphicProps } from "./types.ts";

type DefaultElement = "div";

type ContainerProps<Root extends ElementType> = PolymorphicProps<
  Root,
  {
    size?: "tablet" | "mobile";
  }
>;

export function Container<Root extends ElementType = DefaultElement>(
  props: ContainerProps<Root>,
) {
  const {
    children,
    as,
    size = "tablet",
    class: className,
    ...otherProps
  } = props;

  const Element = as ?? "div";

  const classNames = clsx(
    "p-4 mx-auto my-0",
    size === "tablet" ? "max-w-6xl" : "max-w-4xl",
    className,
  );

  return (
    <Element {...otherProps} class={classNames}>
      {children}
    </Element>
  );
}
