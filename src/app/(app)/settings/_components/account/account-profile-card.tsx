'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { UserAvatar } from '@/app/(app)/_components/user-avatar';
import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { ShellService } from '@/app/(app)/_service';
import { MemberRoleLabel } from '@/app/(app)/settings/_constants/member-role-label';
import {
  formatLastSignIn,
  formatMemberSince,
} from '@/app/(app)/settings/_utils/format-account-date';
import { Badge } from '@/components/ui/badge';

import { AccountProfileRow } from './account-profile-row';

export function AccountProfileCard() {
  const { data: user } = useSuspenseQuery(ShellService.getCurrentUserQuery());
  const project = useCurrentProject();
  const roleLabel = MemberRoleLabel[project.role];

  return (
    <section className="flex flex-col gap-4 rounded-lg border bg-background p-4">
      <div className="flex flex-col items-center gap-3 border-b pb-4">
        <UserAvatar className="size-16 ring-2 ring-border" />
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
      <AccountProfileRow label="Role" value={roleLabel}>
        <Badge variant="secondary">{roleLabel}</Badge>
      </AccountProfileRow>
      <AccountProfileRow
        label="Member Since"
        value={formatMemberSince(user.createdAt)}
      />
      <AccountProfileRow
        label="Last Sign In"
        value={formatLastSignIn(user.lastSignInAt)}
      />
    </section>
  );
}
