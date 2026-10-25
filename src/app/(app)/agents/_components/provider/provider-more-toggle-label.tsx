import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface ProviderMoreToggleLabelProps {
  expanded: boolean;
}

export function ProviderMoreToggleLabel({
  expanded,
}: ProviderMoreToggleLabelProps) {
  if (expanded) {
    return (
      <>
        <ChevronUpIcon />
        Less
      </>
    );
  }
  return (
    <>
      <ChevronDownIcon />
      More options
    </>
  );
}
