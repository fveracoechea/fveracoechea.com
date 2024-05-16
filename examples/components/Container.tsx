import { forwardRef } from "react";

import clsx from "clsx";

import {
  OverridableComponent,
  PolymorphicProps,
} from "../types/polymorphic.ts";

type Props = {
  variant?: "mobile" | "tablet";
};

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
  const { children, as, variant = "tablet", className, ...otherProps } = props;

  const Element = as ?? "div";

  const styles = {
    base: "my-0 mx-auto max-w-6xl",
    variant: {
      mobile: "p-4",
      tablet: "p-8",
    },
  };

  return (
    <Element
      {...otherProps}
      className={clsx(styles.base, styles.variant[variant], className)}
      ref={forwardedRef}
    >
      {children}
    </Element>
  );
}

export const Container = forwardRef(
  ContainerImpl,
) as OverridableComponent<ContainerTypeMap>;
