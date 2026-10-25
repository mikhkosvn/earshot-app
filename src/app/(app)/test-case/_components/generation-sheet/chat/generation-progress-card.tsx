import { GenerationStage } from '@/app/(app)/test-case/_constants/generation-stage';
import { Progress } from '@/components/ui/progress';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';

interface GenerationProgressCardProps {
  session: GenerationSessionView;
  stage: GenerationStage;
}

export function GenerationProgressCard({
  session,
  stage,
}: GenerationProgressCardProps) {
  if (stage !== GenerationStage.generating) return null;
  const total =
    session.generationJob?.result?.totalScenarios ?? session.numScenarios;
  const done = session.generationJob?.result?.completedScenarios ?? 0;
  const percent = Math.round((done / Math.max(total, 1)) * 100);

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">
          {done} of {total} scenarios
        </span>
        <span className="text-muted-foreground">{percent}%</span>
      </div>
      <Progress value={percent} aria-label="Generation progress" />
      <span className="text-xs text-muted-foreground">
        {session.generationJob?.currentStep ?? 'Generating scenarios...'}
      </span>
    </div>
  );
}
