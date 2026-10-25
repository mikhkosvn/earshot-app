import { Volume2Icon, VolumeXIcon } from 'lucide-react';

interface VolumeIconProps {
  muted: boolean;
}

export function VolumeIcon({ muted }: VolumeIconProps) {
  if (muted) return <VolumeXIcon />;
  return <Volume2Icon />;
}
