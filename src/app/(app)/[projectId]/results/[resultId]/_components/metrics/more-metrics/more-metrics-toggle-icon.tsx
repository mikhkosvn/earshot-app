import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

type MoreMetricsToggleIconProps = {
  open: boolean;
};

export function MoreMetricsToggleIcon({ open }: MoreMetricsToggleIconProps) {
  if (open) return <ChevronUpIcon />;
  return <ChevronDownIcon />;
}
