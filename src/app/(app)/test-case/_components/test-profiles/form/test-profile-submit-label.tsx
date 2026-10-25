import type { TestProfileView } from '@/server/test-profiles/types';

interface TestProfileSubmitLabelProps {
  profile: TestProfileView | null;
}

export function TestProfileSubmitLabel({
  profile,
}: TestProfileSubmitLabelProps) {
  if (profile) return 'Save profile';
  return 'Create profile';
}
