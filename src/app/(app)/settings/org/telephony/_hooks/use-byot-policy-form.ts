'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { useUpdateOrganizationSettingsMutation } from '../../_hooks/mutations/use-update-organization-settings-mutation';
import { useOrganizationSettings } from '../../_hooks/use-organization-settings';
import { byotPolicyFormSchema } from '../_schemas/byot-policy-form-schema';

export type ByotPolicyFormValues = z.input<typeof byotPolicyFormSchema>;

export const useByotPolicyForm = () => {
  const settings = useOrganizationSettings();
  const form = useForm<ByotPolicyFormValues>({
    resolver: zodResolver(byotPolicyFormSchema),
    defaultValues: {
      restrictNumbersToOwnImports: settings.restrictNumbersToOwnImports,
    },
  });
  const updateSettings = useUpdateOrganizationSettingsMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateSettings.mutate(
      { organizationId: settings.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The telephony policy is saved.');
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
