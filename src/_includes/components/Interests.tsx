import { cx } from "cva";

import { BarChart, Gauge, Layers, Person } from "./Icons.tsx";

const interests = [
  {
    icon: <Gauge />,
    label: "Web Performance",
  },
  {
    icon: <Layers />,
    label: "Fronted Architecture",
  },
  {
    icon: <Person />,
    label: "Accessible Interfaces",
  },
  { icon: <BarChart />, label: "Data visualizations" },
];

export default function Interests() {
  return (
    <section
      id="interests"
      className="mb-10 rounded bg-cat-waves bg-cover bg-center text-cat-text"
    >
      <ul
        className={cx(
          "not-prose grid w-full grid-cols-2 lg:grid-cols-4",
          "rounded border border-cat-surface0 bg-cat-base/80",
          "p-2",
        )}
      >
        {interests.map(x => (
          <li
            key={x.label}
            className={cx(
              "flex flex-col items-center justify-center gap-2 px-10 py-6 text-center",
            )}
          >
            <span className="text-4xl">{x.icon}</span>
            <span className="text-sm font-medium">{x.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
