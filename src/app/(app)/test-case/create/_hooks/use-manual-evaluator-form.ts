'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useCreateEvaluatorMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluators/use-create-evaluator-mutation';
import {
  type EvaluatorFormOutput,
  evaluatorFormSchema,
  type EvaluatorFormValues,
} from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { Language, ScenarioType } from '@/generated/prisma/enums';
import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { DEFAULT_SCENARIO_TOOLS } from '@/server/evaluators/constants/scenario-tool-descriptions';

import { useCreateFolderParam } from './use-create-folder-param';

export const useManualEvaluatorForm = () => {
  const projectId = useCurrentProjectId();
  const router = useRouter();
  const folderPath = useCreateFolderParam();
  const { data: firstAgent } = useSuspenseQuery({
    ...EvaluatorService.getAgentsQuery({ projectId }),
    select: (agents) => agents.at(0) ?? null,
  });
  const { data: metricIds } = useSuspenseQuery({
    ...EvaluatorService.getMetricsQuery({ projectId }),
    select: (metrics) => metrics.map((metric) => metric.id),
  });
  const form = useForm<EvaluatorFormValues, unknown, EvaluatorFormOutput>({
    resolver: zodResolver(evaluatorFormSchema),
    defaultValues: {
      agentId: firstAgent?.id ?? null,
      name: '',
      folderPath,
      tags: [],
      scenarioType: ScenarioType.instruction,
      testProfileId: firstAgent?.defaultTestProfileId ?? null,
      firstMessage: '',
      instructions: '',
      personalityId: null,
      language: firstAgent?.language ?? Language.en,
      expectedOutcomePrompt: '',
      metricIds,
      expectedToolCalls: [],
      phoneNumberId: null,
      tools: DEFAULT_SCENARIO_TOOLS,
      maxDurationSeconds: null,
    },
  });
  const createEvaluator = useCreateEvaluatorMutation();

  const onSubmit = form.handleSubmit((values) =>
    createEvaluator.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          router.push(
            UrlGenerator.evaluators({
              values: {
                project: projectId,
                folder: result.data.folderPath,
                page: 1,
                pageSize: DEFAULT_PAGE_SIZE,
              },
            }),
          );
        },
      },
    ),
  );

  return { form, onSubmit, isPending: createEvaluator.isPending };
};
