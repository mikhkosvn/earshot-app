import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

type MinimizePanelIconProps = {
  minimized: boolean;
};

export function MinimizePanelIcon({ minimized }: MinimizePanelIconProps) {
  if (minimized) return <ChevronUpIcon />;
  return <ChevronDownIcon />;
}
