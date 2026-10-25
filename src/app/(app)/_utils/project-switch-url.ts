import { MAIN_NAV_GROUPS } from '@/app/(app)/_constants/main-nav';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { isNavItemActive, isPathInSection } from './nav-active';

export const getProjectSwitchUrl = (
  pathname: string,
  currentProjectId: number,
  nextProjectId: number,
) => {
  if (isPathInSection(pathname, UrlGenerator.settings())) return null;

  const activeItem = MAIN_NAV_GROUPS.flatMap((group) => group.items).find(
    (item) => isNavItemActive(item, pathname, currentProjectId),
  );
  if (activeItem) return activeItem.href(nextProjectId);
  return UrlGenerator.agents({ values: { project: nextProjectId } });
};
