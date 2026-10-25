import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface MinimizePanelIconProps {
  minimized: boolean;
}

export function MinimizePanelIcon({ minimized }: MinimizePanelIconProps) {
  if (minimized) return <ChevronUpIcon />;
  return <ChevronDownIcon />;
}
