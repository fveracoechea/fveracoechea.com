import { cx } from "cva";

export default function NavLogo() {
  return (
    <a
      href="/"
      class={cx(
        "rounded border-4 border-transparent transition-shadow",
        "ring-ctp-blue/60 ring-offset-ctp-crust focus-visible:ring-2",
      )}
    >
      <h1
        style={{ whiteSpace: "pre-line" }}
        className={cx(
          "flex items-center font-mono !leading-[0.9]",
          "text-xl font-semibold transition-colors md:text-2xl",
        )}
      >
        <span
          className="select-none text-4xl font-light text-ctp-surface1 md:text-6xl"
          aria-hidden="true"
        >
          {"<"}
        </span>
        <span
          className={cx(
            "flex flex-col text-transparent",
            "bg-gradient-to-r from-ctp-blue to-ctp-mauve bg-clip-text",
          )}
        >
          <span>Francisco</span>
          <span>Veracoechea</span>
        </span>
        <span
          className="select-none text-4xl font-light text-ctp-surface1 md:text-6xl"
          aria-hidden="true"
        >
          {"/>"}
        </span>
      </h1>
    </a>
  );
}
