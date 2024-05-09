import clsx from "npm:clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "success" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    size = "medium",
    variant = "contained",
    color = "primary",
    disabled,
  } = props;

  const classNames = clsx(
    "h-fit appearance-none rounded font-medium transition-colors",
    variant === "contained" && [
      "text-cat-mantle",
      disabled ? "bg-cat-overlay2" : [
        color === "primary" && "bg-cat-blue hover:bg-cat-blue/80",
        color === "success" && "bg-cat-green hover:bg-cat-green/80",
        color === "danger" && "bg-cat-red hover:bg-cat-red/80",
      ],
    ],
    variant === "outlined" && [
      "border-2 bg-cat-mantle",
      disabled ? "border-cat-overlay2 text-cat-overlay2" : [
        color === "primary" &&
        "border-cat-blue text-cat-blue hover:bg-cat-blue/15",
        color === "success" &&
        "border-cat-green text-cat-green hover:bg-cat-green/15",
        color === "danger" && "border-cat-red text-cat-red hover:bg-cat-red/15",
      ],
    ],
    variant === "text" && [
      "font-medium",
      disabled ? "text-cat-overlay2" : [
        color === "primary" && "text-cat-blue hover:bg-cat-blue/15",
        color === "success" && "text-cat-green hover:bg-cat-green/15",
        color === "danger" && "text-cat-red hover:bg-cat-red/15",
      ],
    ],
    size === "small" && "px-4 py-1 text-sm",
    size === "medium" && "px-6 py-1.5 text-base",
    size === "large" && "px-8 py-2 text-lg",
    disabled && "cursor-not-allowed",
  );

  return (
    <button className={classNames} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
