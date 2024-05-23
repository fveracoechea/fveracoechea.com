import clsx from "clsx";

import {
  BarChart,
  Gauge,
  Layers,
  Person,
} from "../_includes/components/Icons.tsx";

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
    <div className="mb-8">
      <ul
        className={clsx(
          "not-prose flex justify-evenly",
          "rounded border border-cat-surface0 bg-cat-mantle",
          // "bg-gradient-to-r from-cat-blue/10 to-cat-mauve/10 text-cat-text",
        )}
      >
        {interests.map((x, i) => (
          <li
            key={x.label}
            className={clsx(
              "flex flex-auto items-center justify-center gap-2 p-4",
              // i < interests.length -1 && "border-r border-r-cat-text",
            )}
          >
            <span className="text-2xl !leading-none">{x.icon}</span>
            <span className="text-sm !leading-none">{x.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
