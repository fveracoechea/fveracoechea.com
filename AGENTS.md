# Agent Guidelines for fveracoechea.com

## Build/Dev Commands

- `deno task build` - Build the site using Lume static site generator
- `deno task serve` - Serve the site locally with live reload
- `deno task format` - Format code using Prettier
- `deno lint` - Run Deno linter with React rules
- No test framework configured - verify changes by building and serving locally

## Code Style

- **Language**: TypeScript with JSX (Preact), using Deno runtime
- **Imports**: Use import maps from deno.json, prefer named imports
- **Components**: Use `.tsx` extension, functional components with Preact hooks
- **Styling**: TailwindCSS with Catppuccin theme (`cat-*` classes), use `cx`
  from cva for conditional classes
- **Types**: Define TypeScript interfaces, use `type` for unions/aliases
- **Naming**: PascalCase for components, camelCase for functions/variables,
  kebab-case for files
- **Islands**: Use `withIsland()` for client-side interactive components
- **Variants**: Use `cva` (class-variance-authority) for component variants
- **Props**: Type component props explicitly, use `ComponentChildren` for
  children
- **File structure**: Components in `_includes/components/`, layouts in
  `_includes/layouts/`
- **Content**: Blog posts in `/blog/`, code snippets in `/snippets/`, both use
  MDX
- **No comments**: Code should be self-documenting unless absolutely necessary
