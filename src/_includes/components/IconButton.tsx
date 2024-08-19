import { cva } from "cva";
import { ComponentProps } from "preact";

const iconButton = cva(
  [
    "flex cursor-pointer appearance-none p-2 ring-cat-blue",
    "outline-none transition-shadow focus-visible:ring-2",
  ],
  {
    variants: {
      active: {
        true: "bg-cat-blue/10 text-cat-blue",
        false: [
          "text-cat-subtext0 hover:bg-cat-blue/10 hover:text-cat-blue",
          "active:ring-2 active:ring-cat-overlay0",
        ],
      },
      rounded: {
        true: "rounded",
        false: "",
      },
    },
  },
);

type Root = "a" | "button" | "label";

type IconButtonProps<R extends Root> = ComponentProps<R> & {
  as?: Root;
  active?: boolean;
  rounded?: boolean;
};

export function IconButton<R extends Root = "button">(
  props: IconButtonProps<R>,
) {
  const {
    children,
    as,
    className,
    active = false,
    rounded = true,
    ...otherProps
  } = props as IconButtonProps<"button">;

  const Element = (as ?? "button") as "button";

  return (
    <Element
      {...otherProps}
      className={iconButton({
        active,
        rounded,
        className,
      })}
    >
      {children}
    </Element>
  );
}
