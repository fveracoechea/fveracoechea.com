import { cva, type VariantProps } from "cva"
import type { ComponentChildren } from "preact"

const button = cva("h-fit appearance-none rounded font-medium transition-colors", {
  variants: {
    modifier: {
      contained: "text-ctp-mantle",
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
      className: "bg-ctp-blue hover:bg-ctp-blue/80",
    },
    {
      modifier: "contained",
      color: "success",
      disabled: false,
      className: "bg-ctp-green hover:bg-ctp-green/80",
    },
    {
      modifier: "contained",
      color: "danger",
      disabled: false,
      className: "bg-ctp-red hover:bg-ctp-red/80",
    },
    {
      modifier: "contained",
      color: ["primary", "success", "danger"],
      disabled: true,
      className: "bg-ctp-overlay2",
    },
    {
      modifier: "outlined",
      color: "primary",
      disabled: false,
      className: "border-ctp-blue text-ctp-blue hover:bg-ctp-blue/15",
    },
    {
      modifier: "outlined",
      color: "success",
      disabled: false,
      className: "border-ctp-green text-ctp-green hover:bg-ctp-green/15",
    },
    {
      modifier: "outlined",
      color: "danger",
      disabled: false,
      className: "border-ctp-red text-ctp-red hover:bg-ctp-red/15",
    },
    {
      modifier: "outlined",
      color: ["primary", "success", "danger"],
      disabled: true,
      className: "border-ctp-overlay2 text-ctp-overlay2",
    },
    {
      modifier: "text",
      color: "primary",
      disabled: false,
      className: "text-ctp-blue hover:bg-ctp-blue/15",
    },
    {
      modifier: "text",
      color: "success",
      disabled: false,
      className: "text-ctp-green hover:bg-ctp-green/15",
    },
    {
      modifier: "text",
      color: "danger",
      disabled: false,
      className: "text-ctp-red hover:bg-ctp-red/15",
    },
    {
      modifier: "text",
      color: ["primary", "success", "danger"],
      disabled: true,
      className: "text-ctp-overlay2",
    },
  ],
  defaultVariants: {
    modifier: "contained",
    color: "primary",
    disabled: false,
    size: "medium",
  },
})

type ButtonProps = VariantProps<typeof button> & {
  children: ComponentChildren
}

export default function Button(props: ButtonProps) {
  const { children, size, modifier, color, disabled } = props

  const classNames = button({ modifier, color, size, disabled })

  return (
    <button type="button" className={classNames} disabled={disabled ?? false}>
      <span>{children}</span>
    </button>
  )
}
