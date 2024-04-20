import { PolymorphicProps } from "../types/components.ts";

type Props = {
  size: "medium" | "small";
};

type TextTypeMap = {
  props: Props;
  defaultComponent: "span";
};

export type TextProps<
  Root extends React.ElementType = TextTypeMap["defaultComponent"],
> = PolymorphicProps<TextTypeMap, Root>;

export function Text(props: TextProps) {
  const { children, as, size = "medium", className, ...otherProps } = props;

  const sizeVariants = {
    medium: "text-base leading-tight",
    small: "text-sm leading-normal",
  };

  const Element = as ?? "span";

  return (
    <Element {...otherProps} className={`${sizeVariants[size]} ${className}`}>
      {children}
    </Element>
  );
}
