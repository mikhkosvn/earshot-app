'use client';

import { ListChecksIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import type { RubricFormValues } from '../../_schemas/rubric-form-schema';
import { emptyRule } from '../../_utils/rule-transitions';
import { RubricActiveCountChip } from './rubric-active-count-chip';
import { RubricAddConditionButton } from './rubric-add-condition-button';
import { RubricConditionBlock } from './rubric-condition-block';
import { RubricConditionsEmpty } from './rubric-conditions-empty';

export function RubricConditionsCard() {
  const { fields, append, remove } = useFieldArray<RubricFormValues, 'rules'>({
    name: 'rules',
  });

  return (
    <section className="flex flex-col rounded-lg border bg-background">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <ListChecksIcon className="size-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Conditions</h2>
        <RubricActiveCountChip />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <RubricConditionsEmpty />
        {fields.map((field, index) => (
          <RubricConditionBlock
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
        <RubricAddConditionButton onAdd={() => append(emptyRule())} />
      </div>
    </section>
  );
}
