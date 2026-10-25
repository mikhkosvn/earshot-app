'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';

import { useEvaluatorId } from '../../_hooks/use-evaluator-id';
import { EditEvaluatorFormBody } from './edit-evaluator-form-body';

export function EditEvaluatorForm() {
  const evaluatorId = useEvaluatorId();
  const { data: detail } = useSuspenseQuery(
    EvaluatorService.getEvaluatorQuery({ evaluatorId }),
  );

  return (
    <EditEvaluatorFormBody
      key={detail.updatedAt.toISOString()}
      detail={detail}
    />
  );
}
