import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { GeneratedEvaluatorView } from '@/server/evaluator-generation/types';
import { ScenarioToolLabel } from '@/server/evaluators/constants/scenario-tool-labels';

import { ScenarioTextBlock } from './scenario-text-block';

type GeneratedScenarioCardProps = {
  evaluator: GeneratedEvaluatorView;
};

export function GeneratedScenarioCard({
  evaluator,
}: GeneratedScenarioCardProps) {
  return (
    <AccordionItem
      value={evaluator.id}
      className="rounded-lg border px-3 not-last:border-b"
    >
      <AccordionTrigger className="gap-2 text-xs">
        <span className="min-w-0 flex-1 truncate">{evaluator.name}</span>
        <Badge variant="outline" className="font-mono">
          ID: {evaluator.id}
        </Badge>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        <ScenarioTextBlock title="Instructions" text={evaluator.instructions} />
        <ScenarioTextBlock
          title="Expected Outcome"
          text={evaluator.expectedOutcomePrompt}
        />
        <div className="flex flex-wrap gap-1.5 text-xs">
          <Badge variant="outline">
            Personality · {evaluator.personalityName ?? '-'}
          </Badge>
          <Badge variant="outline">Language · {evaluator.language}</Badge>
          <Badge variant="outline">
            Test profile · {evaluator.testProfileName ?? '-'}
          </Badge>
        </div>
        <ScenarioTextBlock
          title="Tools Enabled"
          text={evaluator.tools
            .map((tool) => ScenarioToolLabel[tool])
            .join(', ')}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
