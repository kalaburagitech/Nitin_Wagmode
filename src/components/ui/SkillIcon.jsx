import { FaBell, FaCode, FaDatabase, FaKey, FaLayerGroup, FaMobileAlt, FaServer, FaShieldAlt, FaSync } from "react-icons/fa";
import {
  SiAndroidstudio,
  SiAxios,
  SiCss,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGooglechrome,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiSqlite,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiXcode,
} from "react-icons/si";

// Icon keys used in src/data/skills.js. Unknown keys fall back to a code icon.
const icons = {
  react: SiReact,
  next: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  redux: SiRedux,
  html: SiHtml5,
  css: SiCss,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  sqlite: SiSqlite,
  firebase: SiFirebase,
  axios: SiAxios,
  postman: SiPostman,
  jwt: SiJsonwebtokens,
  jest: SiJest,
  testinglibrary: SiTestinglibrary,
  expo: SiExpo,
  androidstudio: SiAndroidstudio,
  xcode: SiXcode,
  git: SiGit,
  github: SiGithub,
  chrome: SiGooglechrome,
  layers: FaLayerGroup,
  database: FaDatabase,
  server: FaServer,
  key: FaKey,
  shield: FaShieldAlt,
  mobile: FaMobileAlt,
  bell: FaBell,
  sync: FaSync,
};

// "theme" follows the surrounding text color, so it adapts to light/dark.
export function skillColor(color) {
  return color === "theme" ? "currentColor" : color;
}

export default function SkillIcon({ name, ...props }) {
  const Icon = icons[name] || FaCode;
  return <Icon aria-hidden="true" {...props} />;
}
