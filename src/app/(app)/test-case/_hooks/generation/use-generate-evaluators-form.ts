'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useStartAssistantMutation } from '@/app/(app)/test-case/_hooks/mutations/generation/use-start-assistant-mutation';
import { useRouteFolderPath } from '@/app/(app)/test-case/_hooks/folders/use-route-folder-path';
import {
  type GenerateEvaluatorsFormOutput,
  generateEvaluatorsFormSchema,
  type GenerateEvaluatorsFormValues,
} from '@/app/(app)/test-case/_schemas/generate-evaluators-form-schema';
import { ScenarioType } from '@/generated/prisma/enums';
import { GenerationScenarioType } from '@/server/evaluator-generation/constants';
import { DEFAULT_FOLDER_PATH } from '@/server/folders/constants';

import { useOpenGenerationSheet } from './use-open-generation-sheet';

const autoOptions = (values: GenerateEvaluatorsFormOutput) => ({
  ...values,
  testProfileId: null,
  phoneNumberId: null,
  personalityIds: [],
  firstMessage: null,
  tools: null,
});

const toOptions = (values: GenerateEvaluatorsFormOutput, isManual: boolean) => {
  if (isManual) return values;
  return autoOptions(values);
};

export const useGenerateEvaluatorsForm = (
  isManual: boolean,
  onStarted: () => void,
) => {
  const projectId = useCurrentProjectId();
  const routeFolderPath = useRouteFolderPath();
  const openSheet = useOpenGenerationSheet();
  const form = useForm<
    GenerateEvaluatorsFormValues,
    unknown,
    GenerateEvaluatorsFormOutput
  >({
    resolver: zodResolver(generateEvaluatorsFormSchema),
    defaultValues: {
      agentId: null,
      folderPath: routeFolderPath ?? DEFAULT_FOLDER_PATH,
      numScenarios: 1,
      scenarioType: GenerationScenarioType.workflow,
      evaluatorFormat: ScenarioType.instruction,
      extraInstructions: '',
      tags: [],
      testProfileId: null,
      phoneNumberId: null,
      personalityIds: [],
      firstMessage: '',
      tools: [],
    },
  });
  const startAssistant = useStartAssistantMutation();

  const onSubmit = form.handleSubmit((values) =>
    startAssistant.mutate(
      { projectId, ...toOptions(values, isManual) },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onStarted();
          openSheet(result.data.sessionId, values.folderPath);
        },
      },
    ),
  );

  return { form, onSubmit, isPending: startAssistant.isPending };
};
