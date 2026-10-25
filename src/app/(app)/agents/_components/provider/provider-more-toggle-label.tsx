import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

type ProviderMoreToggleLabelProps = {
  expanded: boolean;
};

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
