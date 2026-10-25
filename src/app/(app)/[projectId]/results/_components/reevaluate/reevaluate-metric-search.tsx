'use client';

import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

type ReevaluateMetricSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ReevaluateMetricSearch({
  value,
  onChange,
}: ReevaluateMetricSearchProps) {
  return (
    <InputGroup className="h-8">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label="Search metrics"
        placeholder="Search metrics..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  );
}
