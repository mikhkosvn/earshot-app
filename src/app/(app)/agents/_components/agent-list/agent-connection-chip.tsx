import { PhoneIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { telephonyChipLabel } from '../../_utils/telephony-chip-label';

type AgentConnectionChipProps = {
  phoneNumber: string | null;
  inbound: boolean;
};

export function AgentConnectionChip({
  phoneNumber,
  inbound,
}: AgentConnectionChipProps) {
  if (!phoneNumber) return null;

  return (
    <Badge
      variant="outline"
      className="gap-1 font-normal text-muted-foreground"
    >
      <PhoneIcon className="size-3" />
      {telephonyChipLabel(inbound)}
    </Badge>
  );
}
