import { z } from 'zod';

import {
  EvaluationTrigger,
  MetricEvalType,
  MetricType,
  TriggerType,
} from '@/generated/prisma/enums';
import {
  BINARY_EVAL_TYPE_PREFIX,
  REQUIRED_FIELD_MESSAGE,
  UNKNOWN_EVAL_TYPE_MESSAGE,
} from '@/server/metrics/public-api/constants';
import { METRIC_NAME_MAX_LENGTH } from '@/server/metrics/constants/definition/metric-limits';

const idSchema = z.number().int().positive();

const toMetricEvalType = (value: string): MetricEvalType | null => {
  if (value.startsWith(BINARY_EVAL_TYPE_PREFIX)) return MetricEvalType.binary;
  return (
    Object.values(MetricEvalType).find((evalType) => evalType === value) ??
    null
  );
};

const evalTypeSchema = z
  .string({ error: REQUIRED_FIELD_MESSAGE })
  .transform((value, context) => {
    const evalType = toMetricEvalType(value.trim());
    if (evalType) return evalType;
    context.addIssue({ code: 'custom', message: UNKNOWN_EVAL_TYPE_MESSAGE });
    return z.NEVER;
  });

const createPublicMetricObject = z.object({
  name: z
    .string({ error: REQUIRED_FIELD_MESSAGE })
    .trim()
    .min(1, 'Enter a name.')
    .max(
      METRIC_NAME_MAX_LENGTH,
      `The name must have ${METRIC_NAME_MAX_LENGTH} or fewer characters.`,
    ),
  description: z.string().nullish(),
  type: z.enum(MetricType).nullish(),
  eval_type: evalTypeSchema,
  enum_values: z.array(z.string().trim().min(1, 'Enter a key.')).nullish(),
  audio_enabled: z.boolean().nullish(),
  evaluation_trigger: z.enum(EvaluationTrigger).nullish(),
  trigger_type: z.enum(TriggerType).nullish(),
  evaluation_trigger_prompt: z.string().nullish(),
  evaluation_trigger_custom_code: z.string().nullish(),
  configuration: z.record(z.string(), z.number()).nullish(),
  display_order: z.number().int().nullish(),
  observability_enabled: z.boolean().nullish(),
  simulation_enabled: z.boolean().nullish(),
  sampling_enabled: z.boolean().nullish(),
  add_to_new_agents: z.boolean().nullish(),
  project: idSchema.nullish(),
  agents: z.array(idSchema).nullish(),
  custom_code: z.string().nullish(),
});

type CreatePublicMetricShape = z.output<typeof createPublicMetricObject>;

const isBlank = (value: string | null | undefined) => !value?.trim();

const addIssue = (context: z.RefinementCtx, path: string, message: string) =>
  context.addIssue({ code: 'custom', path: [path], message });

const checkEnumValues = (
  values: CreatePublicMetricShape,
  context: z.RefinementCtx,
) => {
  if (values.eval_type !== MetricEvalType.enum) return;
  const enumValues = values.enum_values ?? [];
  if (enumValues.length === 0) {
    addIssue(context, 'enum_values', 'Enter at least one enum key.');
    return;
  }
  if (new Set(enumValues).size !== enumValues.length) {
    addIssue(context, 'enum_values', 'Each enum key must be unique.');
  }
};

const checkBody = (
  values: CreatePublicMetricShape,
  context: z.RefinementCtx,
) => {
  const type = values.type ?? MetricType.llm_judge;
  if (type === MetricType.llm_judge && isBlank(values.description)) {
    addIssue(context, 'description', 'Enter a description.');
  }
  if (type === MetricType.custom_code && isBlank(values.custom_code)) {
    addIssue(context, 'custom_code', 'Enter the Python code.');
  }
};

const checkTrigger = (
  values: CreatePublicMetricShape,
  context: z.RefinementCtx,
) => {
  if (values.evaluation_trigger !== EvaluationTrigger.custom) return;
  const triggerType = values.trigger_type ?? TriggerType.llm_judge;
  if (
    triggerType === TriggerType.llm_judge &&
    isBlank(values.evaluation_trigger_prompt)
  ) {
    addIssue(
      context,
      'evaluation_trigger_prompt',
      'Enter the evaluation trigger prompt.',
    );
  }
  if (
    triggerType === TriggerType.custom_code &&
    isBlank(values.evaluation_trigger_custom_code)
  ) {
    addIssue(
      context,
      'evaluation_trigger_custom_code',
      'Enter the evaluation trigger code.',
    );
  }
};

export const createPublicMetricSchema = createPublicMetricObject.superRefine(
  (values, context) => {
    checkEnumValues(values, context);
    checkBody(values, context);
    checkTrigger(values, context);
  },
);
