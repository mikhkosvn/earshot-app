'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useCreateFromTranscriptMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluator-ai/use-create-from-transcript-mutation';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { EMPTY_TRANSCRIPT } from '../_constants/transcript-example';
import {
  type TranscriptFormOutput,
  transcriptFormSchema,
  type TranscriptFormValues,
} from '../_schemas/transcript-form-schema';
import { useCreateFolderParam } from './use-create-folder-param';

export const useTranscriptForm = () => {
  const projectId = useCurrentProjectId();
  const router = useRouter();
  const folderPath = useCreateFolderParam();
  const { data: firstAgentId } = useSuspenseQuery({
    ...EvaluatorService.getAgentsQuery({ projectId }),
    select: (agents) => agents.at(0)?.id ?? null,
  });
  const form = useForm<TranscriptFormValues, unknown, TranscriptFormOutput>({
    resolver: zodResolver(transcriptFormSchema),
    defaultValues: {
      agentId: firstAgentId,
      folderPath,
      name: '',
      turns: EMPTY_TRANSCRIPT,
    },
  });
  const createFromTranscript = useCreateFromTranscriptMutation();

  const onSubmit = form.handleSubmit((values) =>
    createFromTranscript.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          router.push(
            UrlGenerator.evaluator({
              evaluatorId: result.data.id,
              values: { project: projectId },
            }),
          );
        },
      },
    ),
  );

  return { form, onSubmit, isPending: createFromTranscript.isPending };
};
