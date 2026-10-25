import type { TestProfileView } from '@/server/test-profiles/types';

type TestProfileDialogTitleProps = {
  profile: TestProfileView | null;
};

export function TestProfileDialogTitle({
  profile,
}: TestProfileDialogTitleProps) {
  if (profile) return 'Edit Test Profile';
  return 'Create Test Profile';
}
