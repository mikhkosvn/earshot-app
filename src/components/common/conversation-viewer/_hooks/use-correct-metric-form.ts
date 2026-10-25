'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { ConversationMetricItem } from '@/server/conversations/types';

import {
  type CorrectMetricFormInput,
  correctMetricFormSchema,
} from '../_schemas/correct-metric-form-schema';
import type { ConversationQueryArgs } from '../_service';
import { useCorrectMetricMutation } from './mutations/use-correct-metric-mutation';
import { useConversation } from './use-conversation';

type UseCorrectMetricFormArgs = {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
  onDone: () => void;
};

export const useCorrectMetricForm = ({
  metric,
  query,
  onDone,
}: UseCorrectMetricFormArgs) => {
  const conversation = useConversation(query);
  const correctMetric = useCorrectMetricMutation();
  const form = useForm<CorrectMetricFormInput>({
    resolver: zodResolver(correctMetricFormSchema),
    defaultValues: { feedback: '', expectedValue: metric.value },
  });

  const onSubmit = form.handleSubmit((values) =>
    correctMetric.mutate(
      {
        projectId: conversation.projectId,
        conversationId: conversation.id,
        metricId: metric.metricId,
        expectedValue: values.expectedValue,
        feedback: values.feedback ?? '',
      },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDone();
        },
      },
    ),
  );

  return { form, onSubmit };
};
