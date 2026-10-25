export const GenerationStep = {
  scenario_create: 'evaluator_generation.scenario_create',
} as const;

export type GenerationStep =
  (typeof GenerationStep)[keyof typeof GenerationStep];
