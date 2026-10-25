import type { TestProfileView } from '@/server/test-profiles/types';

import { formatAuthorDate } from '@/app/(app)/test-case/_utils/format-author-date';

type UpdatedCellProps = {
  profile: TestProfileView;
};

export function UpdatedCell({ profile }: UpdatedCellProps) {
  if (profile.updatedAt.getTime() === profile.createdAt.getTime()) {
    return <span className="text-muted-foreground">-</span>;
  }
  return formatAuthorDate(profile.updatedAt, profile.updatedByName);
}
