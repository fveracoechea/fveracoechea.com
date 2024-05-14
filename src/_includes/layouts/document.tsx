import { cx } from 'cva';

export default function Document(props: Lume.Data) {
  const { children } = props;
  return (
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <link rel="stylesheet" href="/styles.css" title="main-tailwindcss" />
        <script type="module" src="/theme.js" />
      </head>
      <body className={cx('relative bg-cat-base text-cat-text')}>
        <div
          className={cx(
            'absolute left-0 top-0 z-0 h-[30vh] w-full md:h-[20vh]',
            'from-cat-crust to-cat-base',
            'bg-gradient-to-b',
          )}
        />
        <div className="relative z-10">{children}</div>
        <div
          className={cx(
            'absolute bottom-0 left-0 z-0 h-[30vh] w-full md:h-[20vh]',
            'from-cat-base to-cat-crust',
            'bg-gradient-to-b',
          )}
        />

        <script type="module" defer src="/main.js" />
      </body>
    </html>
  );
}
