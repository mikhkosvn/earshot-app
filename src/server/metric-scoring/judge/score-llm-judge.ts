import 'server-only';

import { judgeTemplateData } from '@/server/metric-scoring/context/template-data';
import { askJudge } from '@/server/metric-scoring/judge/ask-judge';
import { judgeMock } from '@/server/metric-scoring/judge/judge-mock';
import type { ScoringContext } from '@/server/metric-scoring/types';
import { completed, skipped } from '@/server/metric-scoring/utils/outcome';
import {
  renderTemplate,
  templateVariables,
} from '@/server/metric-scoring/utils/render-template';

const TRANSCRIPT_VARIABLE_PREFIX = 'transcript';

const defaultInputs = (
  description: string,
  data: Record<string, unknown>,
): string[] => {
  const usesTranscript = templateVariables(description).some((variable) =>
    variable.startsWith(TRANSCRIPT_VARIABLE_PREFIX),
  );
  if (usesTranscript) return [];
  return [
    `Transcript Json:\n${JSON.stringify(data.transcript_json)}`,
    `Call End Reason: ${String(data.call_end_reason)}`,
  ];
};

export const variableWarnings = (missing: string[]) => {
  if (missing.length === 0) return [];
  return [`⚠️ Not able to access variables: ${missing.join(', ')}`];
};

export const scoreLlmJudge = async ({
  conversation,
  metric,
  dependencies,
}: ScoringContext) => {
  const data = judgeTemplateData(conversation, dependencies);
  const rendered = renderTemplate(metric.description, data);
  const prompt = [
    `Metric:\n${rendered.text}`,
    ...defaultInputs(metric.description, data),
  ].join('\n\n');
  const judged = await askJudge({
    metric,
    prompt,
    mock: () => judgeMock(conversation, metric, metric.description),
  });
  const explanation = [
    ...judged.explanation,
    ...variableWarnings(rendered.missing),
  ];
  if (judged.result === null) return skipped(explanation);
  return completed(judged.result, explanation);
};
