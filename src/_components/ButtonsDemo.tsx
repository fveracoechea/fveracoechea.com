import clsx from "clsx";

import Button from "../_includes/components/CVAButton.tsx";

type Props = {
  variant: "contained" | "outlined" | "text";
};

export default function (props: Props) {
  const v = props.variant;
  return (
    <div className="flex flex-col gap-2 py-2">
      <div
        className={clsx(
          "playground not-prose flex gap-4",
          "flex-wrap items-center md:justify-between",
        )}
      >
        <Button modifier={v} color="primary" size="small">
          Small
        </Button>
        <Button modifier={v} color="primary" size="medium">
          Medium
        </Button>
        <Button modifier={v} color="primary" size="large">
          Large
        </Button>
        <Button modifier={v} color="success">
          Success
        </Button>
        <Button modifier={v} color="danger">
          Danger
        </Button>
        <Button modifier={v} color="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}
