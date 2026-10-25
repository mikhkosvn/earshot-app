'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { useUpdateOrganizationSettingsMutation } from '../../_hooks/mutations/use-update-organization-settings-mutation';
import { useOrganizationSettings } from '../../_hooks/use-organization-settings';
import { organizationGeneralFormSchema } from '../_schemas/organization-general-form-schema';

export type OrganizationGeneralFormValues = z.input<
  typeof organizationGeneralFormSchema
>;

export const useOrganizationGeneralForm = () => {
  const settings = useOrganizationSettings();
  const form = useForm<OrganizationGeneralFormValues>({
    resolver: zodResolver(organizationGeneralFormSchema),
    defaultValues: {
      name: settings.name,
      teamSize: settings.teamSize,
      maxConcurrentRuns: settings.maxConcurrentRuns,
      allowDuplicateCallIds: settings.allowDuplicateCallIds,
    },
  });
  const updateSettings = useUpdateOrganizationSettingsMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateSettings.mutate(
      { organizationId: settings.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The organization settings are saved.');
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
