'use client';

import { SETTINGS_NAV_GROUPS } from '@/app/(app)/_constants/settings-nav';

import { SidebarNavGroup } from './sidebar-nav-group';

export function SettingsSidebar() {
  return (
    <aside
      aria-label="Settings navigation"
      className="flex w-52 shrink-0 flex-col overflow-y-auto border-r bg-background px-3 py-3.5"
    >
      <nav className="flex flex-col gap-3">
        {SETTINGS_NAV_GROUPS.map((group) => (
          <SidebarNavGroup key={group.label ?? 'top'} group={group} />
        ))}
      </nav>
    </aside>
  );
}
