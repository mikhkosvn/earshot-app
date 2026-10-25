'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PASS_FIELD_LABEL } from '@/server/insights/constants/pass-condition';

import { PassOperatorSelect } from './pass-operator-select';
import { PassValueControl } from './pass-value-control';

export function PassConditionField() {
  return (
    <Field className="gap-1.5">
      <FieldLabel className="text-xs">A call passes when</FieldLabel>
      <div className="grid grid-cols-[1fr_6rem_1fr] gap-2">
        <Input
          readOnly
          value={PASS_FIELD_LABEL}
          aria-label="Pass condition field"
          className="text-xs md:text-xs"
        />
        <PassOperatorSelect />
        <PassValueControl />
      </div>
    </Field>
  );
}
