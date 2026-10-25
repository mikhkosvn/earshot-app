import type { TestProfileView } from '@/server/test-profiles/types';

type TestProfileSubmitLabelProps = {
  profile: TestProfileView | null;
};

export function TestProfileSubmitLabel({
  profile,
}: TestProfileSubmitLabelProps) {
  if (profile) return 'Save profile';
  return 'Create profile';
}
