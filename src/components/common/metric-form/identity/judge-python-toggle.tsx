'use client';

import { CodeXmlIcon, ScaleIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { MetricFormType } from '@/server/metrics/constants/definition/metric-form-type';

import { isMetricFormType } from '../_utils/metric-form-type';

interface JudgePythonToggleProps {
  value: string;
  label: string;
  onValueChange: (value: MetricFormType) => void;
  disabled?: boolean;
}

const ITEM_CLASS =
  'border border-transparent aria-pressed:border-border aria-pressed:bg-background aria-pressed:shadow-xs';

export function JudgePythonToggle({
  value,
  label,
  onValueChange,
  disabled,
}: JudgePythonToggleProps) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      disabled={disabled}
      onValueChange={(next) => {
        const [selected] = next;
        if (!isMetricFormType(selected)) return;
        onValueChange(selected);
      }}
    >
      <ToggleGroupItem value={MetricFormType.llm_judge} className={ITEM_CLASS}>
        <ScaleIcon />
        LLM Judge
      </ToggleGroupItem>
      <ToggleGroupItem
        value={MetricFormType.custom_code}
        className={ITEM_CLASS}
      >
        <CodeXmlIcon />
        Python
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
