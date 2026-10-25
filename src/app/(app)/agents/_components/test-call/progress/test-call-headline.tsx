import { TEST_CALL_IN_PROGRESS_HEADLINE } from '@/server/agents/constants/test-call';
import type { TestCallProgress } from '@/server/agents/types';

type TestCallHeadlineProps = {
  progress: TestCallProgress | null;
  error: string | null;
};

export function TestCallHeadline({ progress, error }: TestCallHeadlineProps) {
  if (error) return error;
  if (!progress) return TEST_CALL_IN_PROGRESS_HEADLINE;
  return progress.headline;
}
