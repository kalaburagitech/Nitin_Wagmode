import { accents, ACCENT_IDS, DEFAULT_ACCENT, DEFAULT_THEME } from "@/data/site";

export const THEME_KEY = "nw-theme";
export const ACCENT_KEY = "nw-accent";

function hexToChannels(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)).join(" ");
}

// CSS variables for each accent in both themes, generated from site.js so
// the palette has a single source of truth.
export const accentStyles = accents
  .map(
    ({ id, light, dark }) =>
      `html[data-accent="${id}"]{--accent:${hexToChannels(light)}}` +
      `html.dark[data-accent="${id}"]{--accent:${hexToChannels(dark)}}`
  )
  .join("");

// Runs before first paint so a saved theme/accent never flashes.
export const themeBootstrap = `(function(){var d=document.documentElement,t=null,a=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)});a=localStorage.getItem(${JSON.stringify(ACCENT_KEY)});}catch(e){}var ok=${JSON.stringify(
  ACCENT_IDS
)};d.classList.toggle("dark",t?t==="dark":${DEFAULT_THEME === "dark"});d.setAttribute("data-accent",ok.indexOf(a)>-1?a:${JSON.stringify(
  DEFAULT_ACCENT
)});})();`;
