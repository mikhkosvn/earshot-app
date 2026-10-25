import { Badge } from '@/components/ui/badge';

type CurrentVersionBadgeProps = {
  current: boolean;
};

export function CurrentVersionBadge({ current }: CurrentVersionBadgeProps) {
  if (!current) return null;
  return (
    <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
      Current
    </Badge>
  );
}
