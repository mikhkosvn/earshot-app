import 'server-only';

import { MOCK_FAILURE_MODES } from '@/server/insights/generation/failure-mock';
import { DEEP_RESEARCH_MODES_MAX } from '@/server/insights/constants/insight-limits';

export type ResearchCall = {
  callLogId: number;
  failed: boolean;
  text: string;
};

export type ResearchResult = {
  headline: string;
  failureModes: { title: string; description: string; callLogIds: number[] }[];
};

const FALLBACK = MOCK_FAILURE_MODES[MOCK_FAILURE_MODES.length - 1];

const modeOf = (call: ResearchCall) => {
  const text = call.text.toLowerCase();
  const match = MOCK_FAILURE_MODES.find((mode) =>
    mode.keywords.some((keyword) => text.includes(keyword)),
  );
  if (match) return match;
  if (call.failed) return FALLBACK;
  return null;
};

export const mockResearch = (calls: ResearchCall[]): ResearchResult => {
  const groups = new Map<string, number[]>();
  calls.forEach((call) => {
    const mode = modeOf(call);
    if (!mode) return;
    groups.set(mode.slug, [...(groups.get(mode.slug) ?? []), call.callLogId]);
  });
  const failureModes = [...groups.entries()]
    .toSorted((left, right) => right[1].length - left[1].length)
    .slice(0, DEEP_RESEARCH_MODES_MAX)
    .flatMap(([slug, callLogIds]) => {
      const mode = MOCK_FAILURE_MODES.find((item) => item.slug === slug);
      if (!mode) return [];
      return [{ title: mode.name, description: mode.description, callLogIds }];
    });
  const [top] = failureModes;
  if (!top) {
    return {
      headline: `No recurring failure mode found in ${calls.length} calls.`,
      failureModes: [],
    };
  }
  return {
    headline: `${failureModes.length} failure mode(s) found in ${calls.length} calls. The most common one is "${top.title}" in ${top.callLogIds.length} call(s).`,
    failureModes,
  };
};
