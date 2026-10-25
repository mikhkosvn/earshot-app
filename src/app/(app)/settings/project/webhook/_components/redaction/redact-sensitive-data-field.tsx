'use client';

import { SettingSwitchField } from '@/app/(app)/settings/_components/fields/setting-switch-field';

import type { WebhookFormValues } from '../../_schemas/webhook-form-schema';
import { RedactionFieldsPicker } from './redaction-fields-picker';

export function RedactSensitiveDataField() {
  return (
    <div className="flex flex-col gap-3">
      <SettingSwitchField<WebhookFormValues>
        name="redactSensitiveData"
        label="Redact Sensitive Data"
        description="Strip selected details from call log webhook payloads, including metadata and dynamic variables. Stored call logs are not changed."
      />
      <RedactionFieldsPicker />
    </div>
  );
}
