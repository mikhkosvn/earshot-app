import { FieldLabel } from '@/components/ui/field';
import type { IntegrationField } from '@/server/agents/constants/provider-integrations';

import { RequiredMark } from '../basics/required-mark';
import { IntegrationFieldDescription } from './integration-field-description';

type IntegrationFieldLabelProps = {
  field: IntegrationField;
  htmlFor: string;
};

export function IntegrationFieldLabel({
  field,
  htmlFor,
}: IntegrationFieldLabelProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <FieldLabel htmlFor={htmlFor} className="gap-0 text-xs">
        {field.label}
        <RequiredMark required={field.required} />
      </FieldLabel>
      <IntegrationFieldDescription description={field.description} />
    </div>
  );
}
