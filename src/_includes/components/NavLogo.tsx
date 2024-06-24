import { cx } from "cva";

export function NavLogo() {
  return (
    <a
      href="/"
      class={cx(
        "rounded border-4 border-transparent transition-shadow",
        "ring-cat-blue/60 ring-offset-cat-crust focus-visible:ring-2",
      )}
    >
      <h1
        className={cx(
          "bg-gradient-to-r from-cat-blue to-cat-mauve bg-clip-text",
          "text-xl font-semibold text-transparent transition-colors md:text-2xl",
        )}
      >
        Francisco Veracoechea
      </h1>
      <h2 className="font-mono text-sm font-normal leading-tight md:text-base">
        <span className="text-cat-red">{"()"}</span>
        <span className="text-cat-subtext0">{" => "}</span>
        <span className="text-cat-teal">{'"Frontend Engineer"'}</span>
      </h2>
    </a>
  );
}
