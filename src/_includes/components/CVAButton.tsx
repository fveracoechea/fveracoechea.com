import { cva, VariantProps } from "cva";
import { ComponentChildren } from "preact";

const button = cva(
  "h-fit appearance-none rounded font-medium transition-colors",
  {
    variants: {
      modifier: {
        contained: "text-cat-mantle",
        outlined: "border-2 bg-transparent",
        text: "bg-transparent",
      },
      color: {
        primary: "",
        success: "",
        danger: "",
      },
      size: {
        small: "px-4 py-1 text-sm",
        medium: "px-6 py-1.5 text-base",
        large: "px-8 py-2 text-lg",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        modifier: "contained",
        color: "primary",
        disabled: false,
        className: "bg-cat-blue hover:bg-cat-blue/80",
      },
      {
        modifier: "contained",
        color: "success",
        disabled: false,
        className: "bg-cat-green hover:bg-cat-green/80",
      },
      {
        modifier: "contained",
        color: "danger",
        disabled: false,
        className: "bg-cat-red hover:bg-cat-red/80",
      },
      {
        modifier: "contained",
        color: ["primary", "success", "danger"],
        disabled: true,
        className: "bg-cat-overlay2",
      },
      {
        modifier: "outlined",
        color: "primary",
        disabled: false,
        className: "border-cat-blue text-cat-blue hover:bg-cat-blue/15",
      },
      {
        modifier: "outlined",
        color: "success",
        disabled: false,
        className: "border-cat-green text-cat-green hover:bg-cat-green/15",
      },
      {
        modifier: "outlined",
        color: "danger",
        disabled: false,
        className: "border-cat-red text-cat-red hover:bg-cat-red/15",
      },
      {
        modifier: "outlined",
        color: ["primary", "success", "danger"],
        disabled: true,
        className: "border-cat-overlay2 text-cat-overlay2",
      },
      {
        modifier: "text",
        color: "primary",
        disabled: false,
        className: "text-cat-blue hover:bg-cat-blue/15",
      },
      {
        modifier: "text",
        color: "success",
        disabled: false,
        className: "text-cat-green hover:bg-cat-green/15",
      },
      {
        modifier: "text",
        color: "danger",
        disabled: false,
        className: "text-cat-red hover:bg-cat-red/15",
      },
      {
        modifier: "text",
        color: ["primary", "success", "danger"],
        disabled: true,
        className: "text-cat-overlay2",
      },
    ],
    defaultVariants: {
      modifier: "contained",
      color: "primary",
      disabled: false,
      size: "medium",
    },
  },
);

type ButtonProps = VariantProps<typeof button> & {
  children: ComponentChildren;
};

export default function Button(props: ButtonProps) {
  const { children, size, modifier, color, disabled } = props;

  const classNames = button({ modifier, color, size, disabled });

  return (
    <button className={classNames} disabled={disabled ?? false}>
      <span>{children}</span>
    </button>
  );
}
