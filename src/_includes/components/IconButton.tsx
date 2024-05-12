import clsx from 'clsx';
import { ComponentProps } from 'preact';


type Root = 'a' | 'button';

type IconButtonProps<R extends Root> = ComponentProps<R> & {
  as?: Root
}

export function IconButton <R extends Root = 'button'>(props: IconButtonProps<R>) {
  const { children, as, class: className, ...otherProps } = props as IconButtonProps<'button'>;

  const Element = (as ?? 'button') as 'button'

  return (
    <Element
      {...otherProps}
      class={clsx(
        'flex',
        'appearance-none rounded border-none p-2 transition-colors',
        'text-cat-text hover:bg-cat-blue/20 hover:text-cat-blue',
        'focus-visible:bg-cat-mauve/20 focus-visible:text-cat-mauve',
        className
      )}

    >
      <span>{children}</span>
    </Element>
  );
}
