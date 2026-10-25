import { Button } from '@/components/ui/button';

import { ExpandLabel } from './expand-label';

interface ExpandToggleButtonProps {
  canExpand: boolean;
  isExpanded: boolean;
  collapsedLabel: string;
  onToggle: () => void;
}

export function ExpandToggleButton({
  canExpand,
  isExpanded,
  collapsedLabel,
  onToggle,
}: ExpandToggleButtonProps) {
  if (!canExpand) return null;

  return (
    <Button
      type="button"
      variant="link"
      size="xs"
      className="h-auto px-0"
      onClick={onToggle}
    >
      <ExpandLabel isExpanded={isExpanded} collapsedLabel={collapsedLabel} />
    </Button>
  );
}
