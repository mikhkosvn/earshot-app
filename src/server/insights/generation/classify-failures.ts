import 'server-only';

import { z } from 'zod';

import { generateObject } from '@/server/ai/generate-object';
import {
  INSIGHT_CATEGORIES_MAX,
  INSIGHT_SLUG_MAX,
} from '@/server/insights/constants/insight-limits';
import {
  mockAssignmentText,
  mockModeOf,
} from '@/server/insights/generation/failure-mock';
import type { FailureItem } from '@/server/insights/generation/load-failures';

export const classificationSchema = z.object({
  headline: z.string(),
  categories: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      description: z.string(),
      summary: z.string(),
    }),
  ),
  assignments: z.array(
    z.object({
      evaluationId: z.number().int(),
      slug: z.string(),
      explanation: z.string(),
    }),
  ),
});

export type Classification = z.infer<typeof classificationSchema>;

export interface KnownCategory {
  slug: string;
  name: string;
  description: string;
}

interface ClassifyInput {
  metric: { name: string; description: string };
  failures: FailureItem[];
  knownCategories: KnownCategory[];
}

const SYSTEM = [
  'You analyse failed evaluations of one metric on production calls of a voice AI agent.',
  'Group the failures into recurring failure modes.',
  `Use at most ${INSIGHT_CATEGORIES_MAX} categories.`,
  'Reuse a known category when a failure fits it. Keep its slug.',
  'A new category gets a short kebab-case slug, a name of 2 to 5 words, and a one-sentence description.',
  'Assign every failure to exactly one category. Give a one-sentence explanation for each assignment.',
  'Write the headline as one plain sentence about the largest problem.',
].join(' ');

const promptOf = ({ metric, failures, knownCategories }: ClassifyInput) =>
  [
    `Metric: ${metric.name}`,
    `Metric description: ${metric.description || 'none'}`,
    `Known categories: ${JSON.stringify(knownCategories)}`,
    'Failures:',
    ...failures.map((failure) =>
      JSON.stringify({
        evaluationId: failure.evaluationId,
        value: failure.value,
        explanation: failure.explanation,
        transcriptStart: failure.excerpt,
      }),
    ),
  ].join('\n');

const categoryWord = (count: number) => {
  if (count === 1) return 'category';
  return 'categories';
};

const headlineOf = (failures: number, categories: number, top: string) =>
  `${failures} failure(s) in ${categories} ${categoryWord(categories)}. The largest one is "${top}".`;

const mockClassification = ({
  failures,
  knownCategories,
}: ClassifyInput): Classification => {
  const counts = new Map<string, number>();
  const assignments = failures.map((failure) => {
    const mode = mockModeOf(failure);
    counts.set(mode.slug, (counts.get(mode.slug) ?? 0) + 1);
    return {
      evaluationId: failure.evaluationId,
      slug: mode.slug,
      explanation: mockAssignmentText(failure, mode),
    };
  });
  const categories = [...counts.entries()]
    .toSorted((left, right) => right[1] - left[1])
    .map(([slug, count]) => {
      const known = knownCategories.find((category) => category.slug === slug);
      const mode = failures
        .map(mockModeOf)
        .find((candidate) => candidate.slug === slug);
      return {
        slug,
        name: known?.name ?? mode?.name ?? slug,
        description: known?.description ?? mode?.description ?? '',
        summary: `${count} call(s) show this failure.`,
      };
    });
  return {
    headline: headlineOf(
      failures.length,
      categories.length,
      categories[0]?.name ?? '',
    ),
    categories,
    assignments,
  };
};

const slugOf = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, INSIGHT_SLUG_MAX) || 'other';

const normalize = (
  result: Classification,
  input: ClassifyInput,
): Classification => {
  const categories = result.categories.map((category) => ({
    ...category,
    slug: slugOf(category.slug || category.name),
  }));
  const known = new Set(categories.map((category) => category.slug));
  const ids = new Set(input.failures.map((failure) => failure.evaluationId));
  const assignments = result.assignments
    .map((assignment) => ({ ...assignment, slug: slugOf(assignment.slug) }))
    .filter(
      (assignment) =>
        ids.has(assignment.evaluationId) && known.has(assignment.slug),
    );
  return { headline: result.headline, categories, assignments };
};

export const classifyFailures = async (input: ClassifyInput) => {
  const result = await generateObject({
    system: SYSTEM,
    prompt: promptOf(input),
    schema: classificationSchema,
    mock: () => mockClassification(input),
  });
  return normalize(result, input);
};
