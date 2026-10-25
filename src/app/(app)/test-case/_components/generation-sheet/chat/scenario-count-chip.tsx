import { LoaderCircleIcon, SparklesIcon } from 'lucide-react';

import { GenerationStage } from '@/app/(app)/test-case/_constants/generation-stage';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

type ScenarioCountChipProps = {
  session: GenerationSessionView;
  stage: GenerationStage;
};

const scenarioWord = (count: number) => {
  if (count === 1) return 'scenario';
  return 'scenarios';
};

export function ScenarioCountChip({ session, stage }: ScenarioCountChipProps) {
  const total = session.numScenarios;

  if (stage === GenerationStage.generating) {
    const done = session.generationJob?.result?.completedScenarios ?? 0;
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
        <LoaderCircleIcon className="size-3.5 animate-spin" />
        {done}/{total} {scenarioWord(total)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
      <SparklesIcon className="size-3.5" />
      {total} {scenarioWord(total)}
    </span>
  );
}
