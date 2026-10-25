'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useAgentOptions } from '@/components/common/metric-form/_hooks/use-agent-options';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import {
  type QuickMetricFormInput,
  quickMetricFormSchema,
  type QuickMetricFormValues,
} from '../_schemas/quick-metric-form-schema';
import { useQuickMetricBuildMutation } from './mutations/use-quick-metric-build-mutation';

export const useQuickMetricForm = () => {
  const router = useRouter();
  const projectId = useCurrentProjectId();
  const agents = useAgentOptions();
  const form = useForm<QuickMetricFormInput, unknown, QuickMetricFormValues>({
    resolver: zodResolver(quickMetricFormSchema),
    defaultValues: {
      agentIds: agents.slice(0, 1).map((agent) => agent.id),
      description: '',
    },
  });
  const quickBuild = useQuickMetricBuildMutation();

  const onSubmit = form.handleSubmit((values) =>
    quickBuild.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          router.push(UrlGenerator.metrics({ values: { project: projectId } }));
        },
      },
    ),
  );

  return { form, onSubmit };
};
