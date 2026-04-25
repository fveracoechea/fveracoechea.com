export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-6xl font-bold text-ctp-overlay0">404</h1>
      <p className="text-lg text-ctp-subtext1">Page not found</p>
      <a
        href="/"
        className="rounded px-4 py-2 text-ctp-blue transition-colors hover:bg-ctp-blue/10"
      >
        Go home
      </a>
    </div>
  );
}
