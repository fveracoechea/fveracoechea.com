import { cva, type VariantProps } from "npm:class-variance-authority";
import { forwardRef, memo } from "npm:react";

import { OverridableComponent, PolymorphicProps } from "../types/components.ts";

const containerVariants = cva("mx-auto my-0 p-6", {
  variants: {
    size: {
      medium: "max-w-6xl",
      small: "max-w-4xl",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type Props = VariantProps<typeof containerVariants>;

type ContainerTypeMap = {
  props: Props;
  defaultComponent: "div";
};

export type ContainerProps<
  Root extends React.ElementType = ContainerTypeMap["defaultComponent"],
> = PolymorphicProps<ContainerTypeMap, Root>;

function ContainerImpl(
  props: ContainerProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { children, as, size = "medium", className, ...otherProps } = props;

  const Element = as ?? "div";
  const classNames = containerVariants({ size, className });

  return (
    <Element {...otherProps} className={classNames} ref={forwardedRef}>
      {children}
    </Element>
  );
}

export const Container = memo(
  forwardRef(ContainerImpl),
) as OverridableComponent<ContainerTypeMap>;
