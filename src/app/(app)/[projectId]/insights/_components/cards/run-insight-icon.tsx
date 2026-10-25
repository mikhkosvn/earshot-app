import { PlayIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';

interface RunInsightIconProps {
  isRunning: boolean;
}

export function RunInsightIcon({ isRunning }: RunInsightIconProps) {
  if (isRunning) return <Spinner />;
  return <PlayIcon />;
}
