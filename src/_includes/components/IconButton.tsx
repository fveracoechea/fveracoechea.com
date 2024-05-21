import { cva } from 'cva';
import { ComponentProps } from 'preact';

const iconButton = cva(
  [
    'flex cursor-pointer appearance-none p-2 ring-cat-blue/80',
    'outline-none ring-0 transition-shadow focus-visible:ring-2',
  ],
  {
    variants: {
      active: {
        true: [
          'border border-cat-blue border-opacity-80 bg-cat-blue text-cat-blue',
        ],
        false: ['text-cat-text hover:bg-cat-overlay2/20'],
      },
      rounded: {
        true: 'rounded',
        false: '',
      },
    },
    compoundVariants: [
      {
        active: false,
        rounded: false,
        className: [
          'border border-transparent',
          'first-of-type:border-r first-of-type:border-r-cat-surface0',
          'last-of-type:border-l last-of-type:border-l-cat-surface0',
        ],
      },
    ],
  },
);

type Root = 'a' | 'button' | 'label';

type IconButtonProps<R extends Root> = ComponentProps<R> & {
  as?: Root;
  active?: boolean;
  rounded?: boolean;
};

export function IconButton<R extends Root = 'button'>(
  props: IconButtonProps<R>,
) {
  const {
    children,
    as,
    class: className,
    active = false,
    rounded = true,
    ...otherProps
  } = props as IconButtonProps<'button'>;

  const Element = (as ?? 'button') as 'button';

  return (
    <Element
      {...otherProps}
      style={
        active && !rounded
          ? '--tw-bg-opacity: 0.2; --tw-border-opacity: 0.6'
          : ''
      }
      class={iconButton({
        active,
        rounded,
        className,
      })}
    >
      {children}
    </Element>
  );
}
