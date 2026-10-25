import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type RubricAddConditionButtonProps = {
  onAdd: () => void;
};

export function RubricAddConditionButton({
  onAdd,
}: RubricAddConditionButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-10 w-full border border-dashed border-border text-muted-foreground"
      onClick={onAdd}
    >
      <PlusIcon />
      Add condition
    </Button>
  );
}
