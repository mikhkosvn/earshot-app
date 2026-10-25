import 'server-only';

import { EvaluationTrigger, TriggerType } from '@/generated/prisma/enums';
import { LAB_RULES_HEADING } from '@/server/metric-optimizer/constants/optimizer-text';
import type {
  MetricProposal,
  ProposalRequest,
} from '@/server/metric-optimizer/utils/propose-metric';
import type { ScoringMetric } from '@/server/metric-scoring/types';

const ITERATION_RULES = [
  'Read the whole transcript before you decide, not only the last turns.',
  'Quote the turn that decided the result, with its timestamp.',
  'Judge only what the transcript shows. Do not assume actions that are not in it.',
  'When the evidence is mixed, decide from the turn closest to the end of the call.',
  'Ignore small wording differences when the intent of the Main Agent is clear.',
];

const NOT_APPLICABLE_RULE =
  'Return N/A when the conversation gives no chance to apply this check.';

const hasNotApplicableRows = (request: ProposalRequest) =>
  request.rows.some((row) => row.expected === null);

const strictnessRules = (request: ProposalRequest) => {
  const missed = request.rows.filter((row) => !row.matched);
  const tooLenient = missed.filter(
    (row) => row.expected === false && row.actual === true,
  ).length;
  const tooStrict = missed.filter(
    (row) => row.expected === true && row.actual === false,
  ).length;
  if (tooLenient > tooStrict) {
    return [
      'Score FALSE when the transcript does not show clear evidence that the criteria are met.',
    ];
  }
  if (tooStrict > 0) {
    return [
      'Score TRUE when the Main Agent meets the intent of the criteria, even with different words.',
    ];
  }
  return [];
};

const notApplicableRules = (request: ProposalRequest) => {
  if (!hasNotApplicableRows(request)) return [];
  return [NOT_APPLICABLE_RULE];
};

const noteRules = (request: ProposalRequest) =>
  request.rows.flatMap((row) => {
    if (!row.feedback) return [];
    return [`Reviewer note: ${row.feedback}`];
  });

const rulesOf = (request: ProposalRequest) => [
  ...new Set([
    ...noteRules(request),
    ...strictnessRules(request),
    ...notApplicableRules(request),
    ...ITERATION_RULES.slice(0, request.iteration),
  ]),
];

const keptTrigger = (metric: ScoringMetric) => ({
  evaluationTrigger: metric.evaluationTrigger,
  triggerType: metric.triggerType,
  evaluationTriggerPrompt: metric.evaluationTriggerPrompt ?? '',
  evaluationTriggerCustomCode: metric.evaluationTriggerCustomCode ?? '',
});

const triggerOf = (request: ProposalRequest) => {
  const { metric } = request;
  if (!hasNotApplicableRows(request)) return keptTrigger(metric);
  if (metric.evaluationTrigger === EvaluationTrigger.custom) {
    return keptTrigger(metric);
  }
  return {
    evaluationTrigger: EvaluationTrigger.custom,
    triggerType: TriggerType.llm_judge,
    evaluationTriggerPrompt: `Return True only if the conversation contains a situation where "${metric.name}" can be checked. Return False when that situation never comes up.`,
    evaluationTriggerCustomCode: metric.evaluationTriggerCustomCode ?? '',
  };
};

const baseDescription = (description: string) =>
  description.split(`\n\n${LAB_RULES_HEADING}`)[0].trim();

const gateChanges = (metric: ScoringMetric, trigger: EvaluationTrigger) => {
  if (trigger === metric.evaluationTrigger) return [];
  return [
    'Added a relevance gate, so the metric is skipped (N/A) when its situation never comes up.',
  ];
};

const notApplicableText = (request: ProposalRequest) => {
  if (!hasNotApplicableRows(request)) {
    return 'Never. The metric scores every conversation.';
  }
  return 'The conversation never gives a chance to apply the check.';
};

export const proposalMock = (request: ProposalRequest): MetricProposal => {
  const { metric } = request;
  const rules = rulesOf(request);
  const trigger = triggerOf(request);
  const base = baseDescription(metric.description);
  return {
    type: metric.type,
    description: [
      base,
      LAB_RULES_HEADING,
      ...rules.map((rule) => `- ${rule}`),
    ].join('\n\n'),
    customCode: metric.customCode ?? '',
    ...trigger,
    summary: {
      whatChanged: [
        `Added ${rules.length} explicit rules from the reviewed Lab rows.`,
        ...gateChanges(metric, trigger.evaluationTrigger),
        'Left the core check of the metric unchanged.',
      ],
      whatItChecks: base,
      returnsFalseWhen:
        'The situation of the metric comes up and the Main Agent does not meet the criteria.',
      returnsTrueWhen:
        'The Main Agent meets the criteria each time the situation comes up.',
      notApplicableWhen: notApplicableText(request),
    },
  };
};
