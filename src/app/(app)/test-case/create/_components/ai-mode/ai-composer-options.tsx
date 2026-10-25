'use client';

import { ChevronDownIcon, HashIcon, WorkflowIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { OptionSelect } from '@/app/(app)/test-case/_components/fields/option-select';
import { AgentSelect } from '@/app/(app)/test-case/_components/fields/selects/agent-select';
import { FolderSelect } from '@/app/(app)/test-case/_components/fields/selects/folder-select';
import type { GenerateEvaluatorsFormValues } from '@/app/(app)/test-case/_schemas/generate-evaluators-form-schema';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  GenerationScenarioType,
  GenerationScenarioTypeLabel,
} from '@/server/evaluator-generation/constants';

import { AI_SCENARIO_COUNT_OPTIONS } from '../../_constants/create-mode';

const countLabel = (count: number) => {
  if (count === 1) return '1 scenario';
  return `${count} scenarios`;
};

const COUNT_ITEMS = AI_SCENARIO_COUNT_OPTIONS.map((count) => ({
  value: count,
  label: countLabel(count),
}));

const TYPE_ITEMS = Object.values(GenerationScenarioType).map((type) => ({
  value: type,
  label: GenerationScenarioTypeLabel[type],
}));

const COMPACT = 'h-8 w-auto max-w-48 text-xs';

interface AiComposerOptionsProps {
  isMoreOpen: boolean;
  onMoreToggle: () => void;
}

export function AiComposerOptions({
  isMoreOpen,
  onMoreToggle,
}: AiComposerOptionsProps) {
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-2">
      <Controller
        name="agentId"
        control={control}
        render={({ field }) => (
          <AgentSelect
            value={field.value}
            onValueChange={field.onChange}
            className={COMPACT}
          />
        )}
      />
      <Controller
        name="folderPath"
        control={control}
        render={({ field }) => (
          <FolderSelect
            value={field.value}
            onValueChange={(next) => field.onChange(next ?? '')}
            className={COMPACT}
          />
        )}
      />
      <Controller
        name="numScenarios"
        control={control}
        render={({ field }) => (
          <OptionSelect
            items={COUNT_ITEMS}
            value={field.value}
            onValueChange={(next) => field.onChange(next ?? 1)}
            placeholder="1 scenario"
            icon={<HashIcon className="text-muted-foreground" />}
            className={COMPACT}
          />
        )}
      />
      <Controller
        name="scenarioType"
        control={control}
        render={({ field }) => (
          <OptionSelect
            items={TYPE_ITEMS}
            value={field.value}
            onValueChange={(next) =>
              field.onChange(next ?? GenerationScenarioType.workflow)
            }
            placeholder="Workflow"
            icon={<WorkflowIcon className="text-muted-foreground" />}
            className={COMPACT}
          />
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-expanded={isMoreOpen}
        className="ml-auto text-muted-foreground"
        onClick={onMoreToggle}
      >
        More
        <ChevronDownIcon
          className={cn('transition-transform', isMoreOpen && 'rotate-180')}
        />
      </Button>
    </div>
  );
}
