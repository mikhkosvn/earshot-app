import type {
  ProjectWebhookSettings,
  WebhookSettingsValues,
} from '@/server/project-webhooks/types';

import type { WebhookFormValues } from '../_schemas/webhook-form-schema';

export const toWebhookFormValues = (
  settings: ProjectWebhookSettings,
): WebhookFormValues => ({
  url: settings.url,
  secret: '',
  notifications: settings.notifications,
  redactionFields: settings.redactionFields,
  redactSensitiveData: settings.redactionFields.length > 0,
  skipCallsWithoutContent: settings.skipCallsWithoutContent,
  forwardVapiWebhooks: settings.forwardVapiWebhooks,
  forwardRetellWebhooks: settings.forwardRetellWebhooks,
});

const redactionFieldsToSave = ({
  redactSensitiveData,
  redactionFields,
}: WebhookFormValues) => {
  if (!redactSensitiveData) return [];
  return redactionFields;
};

export const toWebhookSettingsValues = (
  values: WebhookFormValues,
): WebhookSettingsValues => ({
  url: values.url,
  secret: values.secret,
  notifications: values.notifications,
  redactionFields: redactionFieldsToSave(values),
  skipCallsWithoutContent: values.skipCallsWithoutContent,
  forwardVapiWebhooks: values.forwardVapiWebhooks,
  forwardRetellWebhooks: values.forwardRetellWebhooks,
});

export const toggleListValue = <T>(
  list: readonly T[],
  value: T,
  isOn: boolean,
) => {
  const without = list.filter((item) => item !== value);
  if (!isOn) return without;
  return [...without, value];
};
