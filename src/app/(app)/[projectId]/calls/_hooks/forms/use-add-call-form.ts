'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { uploadCallLogsSchema } from '@/server/call-logs/schemas';
import type { UploadCallLogsInput } from '@/server/call-logs/types';

import { useUploadCallsMutation } from '../mutations/call-ingest/use-upload-calls-mutation';

export const useAddCallForm = (onCreated: () => void) => {
  const projectId = useCurrentProjectId();
  const form = useForm<UploadCallLogsInput>({
    resolver: zodResolver(uploadCallLogsSchema),
    defaultValues: { projectId, agentId: 0, files: [] },
  });
  const uploadCalls = useUploadCallsMutation();

  const onSubmit = form.handleSubmit((values) =>
    uploadCalls.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        form.reset();
        onCreated();
      },
    }),
  );

  return { form, onSubmit };
};
