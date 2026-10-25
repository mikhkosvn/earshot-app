import { organizationSettingsSchema } from '@/server/organization-settings/schemas';

export const organizationGeneralFormSchema = organizationSettingsSchema.pick({
  name: true,
  teamSize: true,
  maxConcurrentRuns: true,
  allowDuplicateCallIds: true,
});
