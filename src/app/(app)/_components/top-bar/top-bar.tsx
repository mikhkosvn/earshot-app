import { AccountMenu } from '@/app/(app)/_components/account-menu/account-menu';
import { NotificationsBell } from '@/app/(app)/_components/notifications/notifications-bell';
import { OrganizationSwitcher } from '@/app/(app)/_components/organization-switcher/organization-switcher';
import { ProjectSwitcher } from '@/app/(app)/_components/project-switcher/project-switcher';

export function TopBar() {
  return (
    <header className="z-10 flex h-12 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex min-w-0 items-center gap-1">
        <OrganizationSwitcher />
        <p className="text-sm text-muted-foreground">/</p>
        <ProjectSwitcher />
      </div>
      <div className="flex items-center gap-2">
        <NotificationsBell />
        <AccountMenu />
      </div>
    </header>
  );
}
