import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { GeneratedEvaluatorView } from '@/server/evaluator-generation/types';

import { GeneratedScenarioCard } from './generated-scenario-card';

type GeneratedScenariosAccordionProps = {
  evaluators: GeneratedEvaluatorView[];
};

export function GeneratedScenariosAccordion({
  evaluators,
}: GeneratedScenariosAccordionProps) {
  if (evaluators.length === 0) return null;

  return (
    <Accordion defaultValue={['generated']} className="rounded-lg border px-3">
      <AccordionItem value="generated">
        <AccordionTrigger>
          Generated Scenarios ({evaluators.length})
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <Accordion className="flex flex-col gap-2">
            {evaluators.map((evaluator) => (
              <GeneratedScenarioCard key={evaluator.id} evaluator={evaluator} />
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
