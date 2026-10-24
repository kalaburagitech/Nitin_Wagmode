export function isActivePath(pathname, path) {
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}
