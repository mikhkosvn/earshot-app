import type { MetricEvalType } from '@/generated/prisma/enums';

export const judgeCode = (description: string, evalType: MetricEvalType) =>
  [
    'res = evaluate_llm_judge_metric(',
    '    data,',
    `    description=${JSON.stringify(description)},`,
    `    eval_type=${JSON.stringify(evalType)},`,
    ')',
    '_result = res["result"]',
    '_explanation = res.get("explanation", "")',
  ].join('\n');
