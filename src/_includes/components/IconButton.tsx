import clsx from 'clsx';
import { ComponentChildren, ComponentProps, JSX } from 'preact';

type Props<T extends JSX.ElementType> = ComponentProps<T> & {
  as?: T;
  children: ComponentChildren;
};

export function IconButton<T extends JSX.ElementType = 'button'>(
  props: Props<T>,
) {
  const { as: Element = 'button', class: className, ...otherProps } = props;

  return (
    <Element
      {...otherProps}
      class={clsx(
        'appearance-none rounded border-none p-4 transition-colors',
        'text-cat-text hover:bg-cat-blue/20 hover:text-cat-blue',
      )}
    >
      <span>{props.children}</span>
    </Element>
  );
}
