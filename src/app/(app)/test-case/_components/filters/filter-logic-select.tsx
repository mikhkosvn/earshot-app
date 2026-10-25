'use client';

import {
  FilterLogic,
  FilterLogicLabel,
} from '@/server/evaluators/constants/evaluator-list';

import { OptionSelect } from '../fields/option-select';

const LOGIC_ITEMS = Object.values(FilterLogic).map((logic) => ({
  value: logic,
  label: FilterLogicLabel[logic],
}));

interface FilterLogicSelectProps {
  value: FilterLogic;
  onValueChange: (logic: FilterLogic) => void;
}

export function FilterLogicSelect({
  value,
  onValueChange,
}: FilterLogicSelectProps) {
  return (
    <OptionSelect
      items={LOGIC_ITEMS}
      value={value}
      onValueChange={(next) => {
        if (next === null) return;
        onValueChange(next);
      }}
      placeholder="OR"
      className="w-20"
    />
  );
}
