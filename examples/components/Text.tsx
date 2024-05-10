import { forwardRef } from 'react';

import {
  OverridableComponent,
  PolymorphicProps,
} from '../types/polymorphic.ts';

type Props = {
  size?: 'large' | 'medium' | 'small';
};

type TextTypeMap = {
  props: Props;
  defaultComponent: 'span';
};

export type TextProps<
  Root extends React.ElementType = TextTypeMap['defaultComponent'],
> = PolymorphicProps<TextTypeMap, Root>;

function TextImpl(props: TextProps) {
  const { children, as, size = 'medium', className, ...otherProps } = props;

  const sizeVariants = {
    large: 'text-lg font-semibold',
    medium: 'text-base font-normal',
    small: 'text-sm font-normal',
  };

  const Element = as ?? 'span';

  return (
    <Element {...otherProps} className={`${sizeVariants[size]} ${className}`}>
      {children}
    </Element>
  );
}

export const Text = forwardRef(TextImpl) as OverridableComponent<TextTypeMap>;
