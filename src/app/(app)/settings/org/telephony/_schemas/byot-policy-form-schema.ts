import { organizationSettingsSchema } from '@/server/organization-settings/schemas';

export const byotPolicyFormSchema = organizationSettingsSchema.pick({
  restrictNumbersToOwnImports: true,
});
