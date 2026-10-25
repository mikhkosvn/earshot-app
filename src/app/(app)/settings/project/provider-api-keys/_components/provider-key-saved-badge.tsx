import { Badge } from '@/components/ui/badge';

interface ProviderKeySavedBadgeProps {
  maskedKey: string | null;
}

export function ProviderKeySavedBadge({
  maskedKey,
}: ProviderKeySavedBadgeProps) {
  if (!maskedKey) return null;

  return (
    <Badge variant="secondary" className="font-normal">
      Saved
    </Badge>
  );
}
