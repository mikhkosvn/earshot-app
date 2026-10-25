'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { ScenarioTool } from '@/generated/prisma/enums';
import {
  SCENARIO_TOOL_ORDER,
  ScenarioToolDescription,
} from '@/server/evaluators/constants/scenario-tool-descriptions';
import { ScenarioToolLabel } from '@/server/evaluators/constants/scenario-tool-labels';

type ToolSwitchListProps = {
  idPrefix: string;
  value: ScenarioTool[];
  onValueChange: (tools: ScenarioTool[]) => void;
};

const setTool = (tools: ScenarioTool[], tool: ScenarioTool, on: boolean) => {
  const rest = tools.filter((item) => item !== tool);
  if (!on) return rest;
  return [...rest, tool];
};

export function ToolSwitchList({
  idPrefix,
  value,
  onValueChange,
}: ToolSwitchListProps) {
  return (
    <div className="flex flex-col divide-y rounded-lg border">
      {SCENARIO_TOOL_ORDER.map((tool) => {
        const id = `${idPrefix}-${tool}`;
        return (
          <div key={tool} className="flex items-center gap-4 px-3 py-2.5">
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor={id}>{ScenarioToolLabel[tool]}</Label>
              <p className="text-xs text-muted-foreground">
                {ScenarioToolDescription[tool]}
              </p>
            </div>
            <Switch
              id={id}
              checked={value.includes(tool)}
              onCheckedChange={(checked) =>
                onValueChange(setTool(value, tool, checked))
              }
            />
          </div>
        );
      })}
    </div>
  );
}
