import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import {
  generatedTriggerSchema,
  generateEvaluationTriggerSchema,
} from '@/server/metrics/schemas';
import type { GeneratedTrigger } from '@/server/metrics/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const SYSTEM_PROMPT = [
  'You write evaluation trigger prompts for voice AI agent metrics.',
  'A trigger decides if a metric applies to a conversation.',
  'Write one prompt that returns True when the metric applies and False otherwise.',
  'Name the roles "main agent" and "testing agent".',
].join('\n');

const MAX_TOPIC_LENGTH = 300;

const triggerMock = (description: string): GeneratedTrigger => {
  const topic = description
    .trim()
    .split(/(?<=[.!?])\s|\n/)[0]
    .replace(/^this metric (measures|checks|evaluates|passes if)\s*/i, '')
    .replace(/[.!?]+$/, '')
    .slice(0, MAX_TOPIC_LENGTH);
  return {
    prompt: `Return True if the conversation gives the main agent a chance to show this behavior: ${topic}. Return False otherwise.`,
  };
};

export const generateEvaluationTrigger = withValidation(
  generateEvaluationTriggerSchema,
  async ({ projectId, description }) => {
    await requireProjectAccess(projectId);
    addEventFields({ project: { id: projectId } });
    return generateObject({
      system: SYSTEM_PROMPT,
      prompt: `Metric description:\n${description}`,
      schema: generatedTriggerSchema,
      mock: () => triggerMock(description),
    });
  },
);
