import type { NavItem } from '@/app/(app)/_constants/nav-types';

const hrefPath = (href: string) => href.split('?')[0];

export const isPathInSection = (pathname: string, sectionPath: string) =>
  pathname === sectionPath || pathname.startsWith(`${sectionPath}/`);

export const isNavItemActive = (
  item: NavItem,
  pathname: string,
  projectId: number,
) => {
  const paths = [item.href(projectId), ...(item.matchPaths ?? [])].map(
    hrefPath,
  );
  if (item.exact) return paths.includes(pathname);
  return paths.some((path) => isPathInSection(pathname, path));
};
