'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useUpdateProjectMutation } from '@/app/(app)/_hooks/mutations/use-update-project-mutation';
import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { projectSettingsSchema } from '@/server/projects/schemas';
import type { ProjectSettingsValues } from '@/server/projects/types';

export const useProjectGeneralForm = () => {
  const project = useCurrentProject();
  const form = useForm<ProjectSettingsValues>({
    resolver: zodResolver(projectSettingsSchema),
    defaultValues: {
      name: project.name,
      timezone: project.timezone,
      outboundTimeout: project.outboundTimeout,
      maxCallDuration: project.maxCallDuration,
      minCallDuration: project.minCallDuration,
      sampleRate: project.sampleRate,
      endCallEnabled: project.endCallEnabled,
      useProviderTranscript: project.useProviderTranscript,
      reconcileProviderTranscripts: project.reconcileProviderTranscripts,
      deepResearchEnabled: project.deepResearchEnabled,
      notifyDailyReport: project.notifyDailyReport,
    },
  });
  const updateProject = useUpdateProjectMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateProject.mutate(
      { projectId: project.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The project settings are saved.');
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
