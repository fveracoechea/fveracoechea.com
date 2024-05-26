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
    <div className="prose">
      <h4>Expertise</h4>
      <ul
        className={clsx(
          "not-prose flex flex-col gap-2.5",
          // "rounded border border-cat-surface0 bg-cat-mantle",
          // "bg-gradient-to-r from-cat-blue/10 to-cat-mauve/10 text-cat-text",
        )}
      >
        {interests.map((x, i) => (
          <li
            key={x.label}
            className={clsx(
              "flex items-center justify-stretch gap-2.5",
              // i < interests.length -1 && "border-r border-r-cat-text",
            )}
          >
            <span className="text-xl ">{x.icon}</span>
            <span className="text-sm ">{x.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
