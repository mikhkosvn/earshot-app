import 'server-only';

import { MetricEvalType } from '@/generated/prisma/enums';

export type QuickMetricDraft = {
  name: string;
  refinedDescription: string;
  evalType: MetricEvalType;
  summary: string;
  resolvedEdgeCases: string[];
};

const NAME_REQUEST_PATTERN =
  /name (?:this|the) metric\s+["'“]?([^."'”\n]+?)["'”]?(?:\.|\n|$)/i;
const MAX_NAME_WORDS = 7;
const TRAILING_STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'before',
  'for',
  'from',
  'in',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
]);

const requestedName = (text: string) =>
  NAME_REQUEST_PATTERN.exec(text)?.[1]?.trim() ?? null;

const withoutNameRequest = (text: string) =>
  text.replace(NAME_REQUEST_PATTERN, '').trim();

const withoutTrailingStopWords = (words: string[]) => {
  const kept = [...words];
  while (
    kept.length > 1 &&
    TRAILING_STOP_WORDS.has(kept.at(-1)!.toLowerCase())
  ) {
    kept.pop();
  }
  return kept;
};

const titleCase = (words: string[]) =>
  words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const derivedName = (text: string) => {
  const firstSentence = withoutNameRequest(text).split(/[.!?\n]/)[0] ?? '';
  const words = firstSentence
    .replace(/^(check|verify|measure|evaluate)\s+(whether|if|that)\s+/i, '')
    .replace(/^the (main )?agent\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_NAME_WORDS);
  if (words.length === 0) return 'Custom Quick Metric';
  return titleCase(withoutTrailingStopWords(words));
};

export const quickMetricMock = (description: string): QuickMetricDraft => {
  const request = withoutNameRequest(description);
  return {
    name: requestedName(description) ?? derivedName(description),
    refinedDescription: `PASS if the Main Agent satisfies this request: ${request} FAIL if the Main Agent does not. Return N/A when the conversation gives no chance to check it.`,
    evalType: MetricEvalType.binary,
    summary: `The metric checks this request on each call: ${request}`,
    resolvedEdgeCases: [
      'No chance to check: the metric returns N/A when the situation does not arise in the call.',
      'Partial behavior: the metric fails when the Main Agent only starts the expected behavior and does not finish it.',
    ],
  };
};
