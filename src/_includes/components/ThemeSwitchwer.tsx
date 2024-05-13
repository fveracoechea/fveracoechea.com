import { useState } from "preact/hooks";
import { IconButton } from "./IconButton.tsx";
import { Sun, Moon, Computer } from "npm:lucide-preact";
import clsx from "clsx";

export default function() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');


  return (
    <div data-island="ThemeSwitcher">


    <div class={clsx(
      "flex gap-2 p-2n bg-cat-base",
      "text-cat-text border border-cat-surface0 rounded"
    )}>
      <IconButton title="Light theme"
        onClick={()=> setTheme('light')}
        class={clsx(theme === 'light' && 'text-cat-blue gb-cat-blue/20')}>
        <Sun />
      </IconButton>
      <IconButton title="Dark theme" class={clsx(theme === 'dark' && 'text-cat-blue gb-cat-blue/20')}>
        <Moon />
      </IconButton>
      <IconButton title="System theme" class={clsx(theme === 'system' && 'text-cat-blue gb-cat-blue/20')}>
        <Computer />
      </IconButton>
    </div>
    </div>
  )
}
