import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { RubricFieldLabel } from '../rubric-field-label';

type RubricEmptyValueFieldProps = {
  index: number;
};

export function RubricEmptyValueField({ index }: RubricEmptyValueFieldProps) {
  const id = `rubric-rule-${index}-value`;

  return (
    <Field className="gap-1.5">
      <RubricFieldLabel htmlFor={id}>Value</RubricFieldLabel>
      <Input
        id={id}
        disabled
        placeholder="Select a metric first"
        className="bg-background"
      />
    </Field>
  );
}
