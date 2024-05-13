import {hydrate} from 'preact'

import ThemeSwitchwer from "../_includes/components/ThemeSwitcher.tsx";

const island = document.querySelector('[data-island="ThemeSwitcher"]')

hydrate(<ThemeSwitchwer />, island)
