import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { RubricAndChip } from './rubric-and-chip';
import { RubricMetricField } from './rubric-metric-field';
import { RubricOperatorField } from './rubric-operator-field';
import { RubricValueField } from './value/rubric-value-field';

interface RubricConditionBlockProps {
  index: number;
  onRemove: () => void;
}

export function RubricConditionBlock({
  index,
  onRemove,
}: RubricConditionBlockProps) {
  return (
    <>
      <RubricAndChip index={index} />
      <div className="grid grid-cols-1 items-start gap-2 rounded-lg border bg-muted/20 p-3 md:grid-cols-[minmax(0,2fr)_8rem_minmax(0,2.5fr)_auto]">
        <RubricMetricField index={index} />
        <RubricOperatorField index={index} />
        <RubricValueField index={index} />
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Remove condition"
          className="text-muted-foreground md:mt-6"
          onClick={onRemove}
        >
          <Trash2Icon />
        </Button>
      </div>
    </>
  );
}
