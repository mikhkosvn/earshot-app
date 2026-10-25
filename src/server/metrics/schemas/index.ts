import { z } from 'zod';

import {
  EvaluationTrigger,
  MetricEvalType,
  MetricType,
  TriggerType,
} from '@/generated/prisma/enums';
import {
  FormEvaluationTrigger,
  MetricFormType,
} from '@/server/metrics/constants/definition/metric-form-type';
import {
  MAX_METRIC_DEPENDENCIES,
  METRIC_NAME_MAX_LENGTH,
} from '@/server/metrics/constants/definition/metric-limits';

const idSchema = z.number().int().positive();

const idListSchema = z.array(idSchema);

export const metricNameSchema = z
  .string()
  .trim()
  .min(1, 'Enter a name.')
  .max(
    METRIC_NAME_MAX_LENGTH,
    `The name must have ${METRIC_NAME_MAX_LENGTH} or fewer characters.`,
  );

export const metricSlugSchema = z
  .string()
  .trim()
  .min(1, 'Enter a slug.')
  .max(METRIC_NAME_MAX_LENGTH, 'The slug is too long.')
  .regex(
    /^[a-z0-9]+(_[a-z0-9]+)*$/,
    'Use lowercase letters, numbers, and single underscores.',
  );

export const metricDefinitionObject = z.object({
  type: z.enum(MetricType),
  name: metricNameSchema,
  slug: metricSlugSchema,
  evalType: z.enum(MetricEvalType, { error: 'Select a metric type.' }),
  enumValues: z.array(z.string().trim().min(1, 'Enter a key.')),
  audioEnabled: z.boolean(),
  description: z.string(),
  customCode: z.string(),
  configuration: z.record(z.string(), z.number()).nullable(),
  dependencyIds: idListSchema.max(
    MAX_METRIC_DEPENDENCIES,
    `Pick ${MAX_METRIC_DEPENDENCIES} or fewer metrics.`,
  ),
  evaluationTrigger: z.enum(EvaluationTrigger),
  triggerType: z.enum(TriggerType),
  evaluationTriggerPrompt: z.string(),
  evaluationTriggerCustomCode: z.string(),
  addToNewAgents: z.boolean(),
});

type MetricDefinitionShape = z.output<typeof metricDefinitionObject>;

const addIssue = (context: z.RefinementCtx, path: string, message: string) =>
  context.addIssue({ code: 'custom', path: [path], message });

const checkEnumValues = (
  values: MetricDefinitionShape,
  context: z.RefinementCtx,
) => {
  if (values.evalType !== MetricEvalType.enum) return;
  if (values.enumValues.length === 0) {
    addIssue(context, 'enumValues', 'Enter at least one enum key.');
    return;
  }
  if (new Set(values.enumValues).size !== values.enumValues.length) {
    addIssue(context, 'enumValues', 'Each enum key must be unique.');
  }
};

const checkBody = (values: MetricDefinitionShape, context: z.RefinementCtx) => {
  if (values.type === MetricType.llm_judge && !values.description.trim()) {
    addIssue(context, 'description', 'Enter a description.');
  }
  if (values.type === MetricType.custom_code && !values.customCode.trim()) {
    addIssue(context, 'customCode', 'Enter the Python code.');
  }
};

const checkTrigger = (
  values: MetricDefinitionShape,
  context: z.RefinementCtx,
) => {
  if (values.evaluationTrigger !== EvaluationTrigger.custom) return;
  if (
    values.triggerType === TriggerType.llm_judge &&
    !values.evaluationTriggerPrompt.trim()
  ) {
    addIssue(
      context,
      'evaluationTriggerPrompt',
      'Enter the evaluation trigger prompt.',
    );
  }
  if (
    values.triggerType === TriggerType.custom_code &&
    !values.evaluationTriggerCustomCode.trim()
  ) {
    addIssue(
      context,
      'evaluationTriggerCustomCode',
      'Enter the evaluation trigger code.',
    );
  }
};

export const checkMetricDefinition = (
  values: MetricDefinitionShape,
  context: z.RefinementCtx,
) => {
  checkEnumValues(values, context);
  checkBody(values, context);
  checkTrigger(values, context);
};

export const metricDefinitionSchema = metricDefinitionObject.superRefine(
  checkMetricDefinition,
);

export const createMetricObject = metricDefinitionObject.extend({
  projectId: idSchema,
  type: z.enum(MetricFormType),
  evaluationTrigger: z.enum(FormEvaluationTrigger),
  agentIds: idListSchema,
  scenarioIds: idListSchema,
  addToRubric: z.boolean(),
});

export const createMetricSchema = createMetricObject.superRefine(
  checkMetricDefinition,
);

export const updateMetricObject = metricDefinitionObject.extend({
  metricId: idSchema,
});

export const updateMetricSchema = updateMetricObject.superRefine(
  checkMetricDefinition,
);

export const projectIdSchema = z.object({
  projectId: idSchema,
});

export const metricIdSchema = z.object({
  metricId: idSchema,
});

export const listMetricsSchema = z.object({
  projectId: idSchema,
  viewId: idSchema.nullable().optional(),
});

const metricFlagsObject = z.object({
  observabilityEnabled: z.boolean().optional(),
  simulationEnabled: z.boolean().optional(),
  samplingEnabled: z.boolean().optional(),
});

export const updateMetricFlagsSchema = metricFlagsObject.extend({
  metricId: idSchema,
});

export const bulkUpdateMetricFlagsSchema = metricFlagsObject.extend({
  projectId: idSchema,
  metricIds: idListSchema.min(1, 'Select at least one metric.'),
});

export const updateMetricSampleRateSchema = z.object({
  metricId: idSchema,
  sampleRate: z
    .number({ error: 'Enter a percentage from 0 to 100.' })
    .min(0, 'Enter a percentage from 0 to 100.')
    .max(1, 'Enter a percentage from 0 to 100.')
    .nullable(),
});

export const reorderMetricsSchema = z.object({
  projectId: idSchema,
  metricIds: idListSchema.min(1),
});

export const updateMetricAgentsSchema = z.object({
  metricId: idSchema,
  agentIds: idListSchema,
  addToNewAgents: z.boolean(),
});

export const assignMetricAgentsSchema = z.object({
  projectId: idSchema,
  metricIds: idListSchema.min(1, 'Select at least one metric.'),
  agentIds: idListSchema,
});

export const deleteMetricsSchema = z.object({
  projectId: idSchema,
  metricIds: idListSchema.min(1, 'Select at least one metric.'),
});

export const copyPredefinedMetricsSchema = z.object({
  projectId: idSchema,
  codes: z.array(z.string().min(1)).min(1, 'Select at least one metric.'),
});

export const startMetricGenerationSchema = z.object({
  projectId: idSchema,
  agentId: idSchema,
});

export const generatedMetricSchema = z.object({
  name: metricNameSchema,
  description: z.string().trim().min(1, 'Enter a description.'),
  evalType: z.enum(MetricEvalType),
});

export const bulkCreateMetricsSchema = z.object({
  projectId: idSchema,
  jobId: z.uuid(),
  metrics: z.array(generatedMetricSchema).min(1, 'Select at least one metric.'),
});

export const startQuickMetricBuildSchema = z.object({
  projectId: idSchema,
  agentIds: idListSchema.min(1, 'Select at least one agent.'),
  description: z
    .string()
    .trim()
    .min(1, 'Describe what the metric should measure.'),
});

export const improveMetricSchema = z.object({
  projectId: idSchema,
  agentId: idSchema,
  type: z.enum(MetricFormType),
  evalType: z.enum(MetricEvalType),
  text: z
    .string()
    .trim()
    .min(1, 'Write a first version before you improve it.'),
});

export const generateEvaluationTriggerSchema = z.object({
  projectId: idSchema,
  description: z.string().trim().min(1, 'Enter a description first.'),
});

export const reviewIdSchema = z.object({
  reviewId: idSchema,
});

export const patternCorrectionValueSchema = z.union([
  z.boolean(),
  z.number(),
  z.string(),
  z.null(),
]);

export const setPatternCorrectionSchema = z.object({
  reviewId: idSchema,
  groupKey: z.string().min(1),
  correction: z
    .object({
      value: patternCorrectionValueSchema,
      note: z.string().trim().max(2000),
    })
    .nullable(),
});
