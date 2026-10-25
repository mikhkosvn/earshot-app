import type { MemberRow } from '@/server/members/types';

import { memberInitial } from '../../_utils/filter-members';
import { MemberYouBadge } from './member-you-badge';

interface MemberPersonCellProps {
  member: MemberRow;
}

export function MemberPersonCell({ member }: MemberPersonCellProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex size-7 shrink-0 items-center justify-center rounded-full border text-xs text-muted-foreground"
      >
        {memberInitial(member)}
      </span>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium">{member.name}</span>
          <MemberYouBadge isCurrentUser={member.isCurrentUser} />
        </div>
        <span className="truncate text-xs text-muted-foreground">
          {member.email}
        </span>
      </div>
    </div>
  );
}
