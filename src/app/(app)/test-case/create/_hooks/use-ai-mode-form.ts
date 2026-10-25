'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useStartAssistantMutation } from '@/app/(app)/test-case/_hooks/mutations/generation/use-start-assistant-mutation';
import {
  type GenerateEvaluatorsFormOutput,
  generateEvaluatorsFormSchema,
  type GenerateEvaluatorsFormValues,
} from '@/app/(app)/test-case/_schemas/generate-evaluators-form-schema';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { ScenarioType } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { GenerationScenarioType } from '@/server/evaluator-generation/constants';

import { useCreateFolderParam } from './use-create-folder-param';

export const useAiModeForm = () => {
  const projectId = useCurrentProjectId();
  const router = useRouter();
  const folderPath = useCreateFolderParam();
  const { data: firstAgentId } = useSuspenseQuery({
    ...EvaluatorService.getAgentsQuery({ projectId }),
    select: (agents) => agents.at(0)?.id ?? null,
  });
  const form = useForm<
    GenerateEvaluatorsFormValues,
    unknown,
    GenerateEvaluatorsFormOutput
  >({
    resolver: zodResolver(generateEvaluatorsFormSchema),
    defaultValues: {
      agentId: firstAgentId,
      folderPath,
      numScenarios: 1,
      scenarioType: GenerationScenarioType.workflow,
      evaluatorFormat: ScenarioType.instruction,
      extraInstructions: '',
      tags: [],
      testProfileId: null,
      phoneNumberId: null,
      personalityIds: [],
      firstMessage: null,
      tools: null,
    },
  });
  const startAssistant = useStartAssistantMutation();

  const onSubmit = form.handleSubmit((values) =>
    startAssistant.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          router.push(
            UrlGenerator.evaluators({
              values: {
                project: projectId,
                folder: values.folderPath,
                reopenSheet: true,
                sessionId: result.data.sessionId,
              },
            }),
          );
        },
      },
    ),
  );

  return { form, onSubmit, isPending: startAssistant.isPending };
};
