export function getTailwindSheet() {
  for (const sheet of document.styleSheets) {
    if (sheet.title === "main-tailwindcss") return sheet;
  }
  return null;
}
