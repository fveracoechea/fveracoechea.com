import { cx } from "cva"

interface Interest {
  icon: preact.ComponentChildren
  label: string
}

const accentColors = [
  "text-ctp-blue",
  "text-ctp-mauve",
  "text-ctp-flamingo",
  "text-ctp-peach",
  "text-ctp-green",
  "text-ctp-lavender",
]

export function InterestsCards({ interests }: { interests: Interest[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
      {interests.map((x, i) => (
        <li
          key={x.label}
          className={cx(
            "flex flex-col items-center gap-1.5 rounded-lg border border-ctp-surface0 p-3 sm:p-4",
            " text-center",
            "transition-all duration-200 ease-out",
            "hover:-translate-y-0.5 hover:border-ctp-surface1 hover:bg-ctp-surface0/40",
          )}
        >
          <span
            className={cx(
              "flex size-10 items-center justify-center rounded-full text-lg sm:h-10 sm:w-10 sm:text-2xl bg-ctp-surface0/50",
              accentColors[i],
            )}
          >
            {x.icon}
          </span>
          <span className="text-xs font-medium text-ctp-subtext1 sm:text-sm">{x.label}</span>
        </li>
      ))}
    </ul>
  )
}
