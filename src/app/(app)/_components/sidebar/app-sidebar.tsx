'use client';

import { usePathname } from 'next/navigation';

import { isPathInSection } from '@/app/(app)/_utils/nav-active';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { MainSidebar } from './main-sidebar';
import { SettingsSidebar } from './settings-sidebar';

export function AppSidebar() {
  const pathname = usePathname();

  if (isPathInSection(pathname, UrlGenerator.settings())) {
    return <SettingsSidebar />;
  }
  return <MainSidebar />;
}
