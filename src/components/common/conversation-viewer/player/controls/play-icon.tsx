import { PauseIcon, PlayIcon as LucidePlayIcon } from 'lucide-react';

type PlayIconProps = {
  playing: boolean;
};

export function PlayIcon({ playing }: PlayIconProps) {
  if (playing) return <PauseIcon />;
  return <LucidePlayIcon />;
}
