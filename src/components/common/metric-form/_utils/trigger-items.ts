import { EvaluationTrigger } from '@/generated/prisma/enums';
import { FormEvaluationTrigger } from '@/server/metrics/constants/definition/metric-form-type';
import { EvaluationTriggerLabel } from '@/server/metrics/constants/evaluation-trigger-labels';

const FORM_TRIGGERS: EvaluationTrigger[] = Object.values(FormEvaluationTrigger);

export const triggerItems = (current: EvaluationTrigger | undefined) => {
  const values = FORM_TRIGGERS.filter((value) => value !== current).concat(
    current ?? [],
  );
  return Object.values(EvaluationTrigger)
    .filter((value) => values.includes(value))
    .map((value) => ({ value, label: EvaluationTriggerLabel[value] }));
};
