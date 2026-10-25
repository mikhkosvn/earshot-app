import type { MockToolItem } from '@/server/agents/types';

interface MockToolSubmitLabelProps {
  tool: MockToolItem | null;
  pending: boolean;
}

export function MockToolSubmitLabel({
  tool,
  pending,
}: MockToolSubmitLabelProps) {
  if (pending) return 'Saving...';
  if (tool) return 'Save Tool';
  return 'Create Tool';
}
