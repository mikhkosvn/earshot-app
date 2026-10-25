import { CircleDashedIcon, Loader2Icon } from 'lucide-react';

interface WebhookTestIconProps {
  isPending: boolean;
}

export function WebhookTestIcon({ isPending }: WebhookTestIconProps) {
  if (isPending) return <Loader2Icon className="animate-spin" />;
  return <CircleDashedIcon />;
}
