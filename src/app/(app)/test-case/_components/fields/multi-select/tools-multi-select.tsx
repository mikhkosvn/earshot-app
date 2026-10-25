'use client';

import type { ScenarioTool } from '@/generated/prisma/enums';
import { SCENARIO_TOOL_ORDER } from '@/server/evaluators/constants/scenario-tool-descriptions';
import { ScenarioToolLabel } from '@/server/evaluators/constants/scenario-tool-labels';

import { OptionMultiSelect } from './option-multi-select';

const TOOL_OPTIONS = SCENARIO_TOOL_ORDER.map((tool) => ({
  value: tool,
  label: ScenarioToolLabel[tool],
}));

interface ToolsMultiSelectProps {
  id?: string;
  value: readonly ScenarioTool[];
  onValueChange: (tools: ScenarioTool[]) => void;
  placeholder: string;
}

export function ToolsMultiSelect({
  id,
  value,
  onValueChange,
  placeholder,
}: ToolsMultiSelectProps) {
  return (
    <OptionMultiSelect
      id={id}
      options={TOOL_OPTIONS}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
    />
  );
}
