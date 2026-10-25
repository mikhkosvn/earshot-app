import type { MockToolItem } from '@/server/agents/types';

type MockToolDialogTitleProps = {
  tool: MockToolItem | null;
};

export function MockToolDialogTitle({ tool }: MockToolDialogTitleProps) {
  if (tool) return 'Edit Mock Tool';
  return 'Add Mock Tool';
}
