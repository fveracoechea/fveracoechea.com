function Card() {
  return (
    <div className="flex w-full gap-4 p-4">
      <div className="h-20 w-20 rounded bg-ctp-surface1" />
      <div className="flex w-full flex-col gap-2">
        <div className="h-4 w-1/3 rounded-full bg-ctp-surface1" />
        <div className="h-2 w-3/4 rounded-full bg-ctp-surface1" />
        <div className="h-2 w-2/3 rounded-full bg-ctp-surface1" />
        <div className="mt-1.5 h-4 w-28 rounded-full border-2 border-ctp-blue bg-ctp-blue/25" />
      </div>
    </div>
  )
}

export default function IslandsDemo() {
  return (
    <section className="flex flex-col gap-4 rounded border border-ctp-surface1 bg-ctp-mantle p-4">
      <div
        role="presentation"
        className="flex justify-between gap-4 rounded border-2 border-ctp-surface2 bg-ctp-surface0 p-2"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-ctp-surface1" />
          <div className="h-6 w-16 rounded-full bg-ctp-surface1" />
          <div className="hidden h-6 w-16 rounded-full bg-ctp-surface1 md:block" />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden h-6 w-16 rounded-full bg-ctp-surface1 md:block" />
          <div className="hidden h-6 w-16 rounded-full bg-ctp-surface1 md:block" />
          <div className="h-10 w-28 rounded-full border-2 border-ctp-blue bg-ctp-blue/25" />
        </div>
      </div>

      <div role="presentation" className="flex gap-4">
        <div className="hidden min-h-80 flex-1 rounded border-2 border-ctp-surface2 bg-ctp-surface0 p-4 md:flex">
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex w-full flex-col justify-between gap-4">
              <div className="h-4 w-1/2 rounded-full bg-ctp-surface1" />
              <div className="h-4 w-2/3 rounded-full bg-ctp-surface1" />
              <div className="h-4 w-3/4 rounded-full bg-ctp-surface1" />
              <div className="h-4 w-2/3 rounded-full bg-ctp-surface1" />
            </div>
            <div className="flex gap-4 self-end">
              <div className="h-4 w-12 rounded-full border-2 border-ctp-blue bg-ctp-blue/25" />
            </div>
          </div>
        </div>

        <div className="min-h-80 flex-3 rounded border-2 border-ctp-surface2 bg-ctp-surface0">
          <Card />
          <Card />
          <Card />
        </div>
      </div>

      <ul title="legends" className="pt-4">
        <li className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full border-2 border-ctp-blue bg-ctp-blue/25" />
          <span>Islands of interactivity.</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full border-2 border-ctp-surface2 bg-ctp-surface0" />
          <span>Non-interactive UI components.</span>
        </li>
      </ul>
    </section>
  )
}
