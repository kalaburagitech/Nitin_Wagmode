// Visual defaults shared by the theme bootstrap script, ThemeProvider, and
// the accent picker. Each accent has a lighter tone for dark mode and a
// deeper one for light mode so text on it stays readable in both.

export const DEFAULT_THEME = "dark"; // "dark" | "light"
export const DEFAULT_ACCENT = "teal";

export const accents = [
  { id: "teal", label: "Teal", dark: "#2dd4bf", light: "#0f766e" },
  { id: "indigo", label: "Indigo", dark: "#a5b4fc", light: "#4338ca" },
  { id: "coral", label: "Coral", dark: "#fb7185", light: "#be123c" },
  { id: "amber", label: "Amber", dark: "#fbbf24", light: "#b45309" },
  { id: "lime", label: "Lime", dark: "#a3e635", light: "#4d7c0f" },
];

export const ACCENT_IDS = accents.map((accent) => accent.id);
