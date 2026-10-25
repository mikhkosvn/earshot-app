import { Volume2Icon, VolumeXIcon } from 'lucide-react';

type VolumeIconProps = {
  muted: boolean;
};

export function VolumeIcon({ muted }: VolumeIconProps) {
  if (muted) return <VolumeXIcon />;
  return <Volume2Icon />;
}
