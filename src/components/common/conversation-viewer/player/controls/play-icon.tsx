import { PauseIcon, PlayIcon as LucidePlayIcon } from 'lucide-react';

interface PlayIconProps {
  playing: boolean;
}

export function PlayIcon({ playing }: PlayIconProps) {
  if (playing) return <PauseIcon />;
  return <LucidePlayIcon />;
}
