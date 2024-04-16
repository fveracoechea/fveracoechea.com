import { cva, type VariantProps } from "npm:class-variance-authority";
import { forwardRef, memo } from "npm:react";

import { OverridableComponent, PolymorphicProps } from "../types/components.ts";

const containerVariants = cva("mx-auto my-0 p-6", {
  variants: {
    size: {
      tablet: "max-w-6xl",
      mobile: "max-w-4xl",
    },
  },
  defaultVariants: {
    size: "tablet",
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
  const { children, as, size = "tablet", className, ...otherProps } = props;

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
