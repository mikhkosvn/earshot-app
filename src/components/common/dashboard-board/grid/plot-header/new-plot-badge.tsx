import { Badge } from '@/components/ui/badge';

interface NewPlotBadgeProps {
  isNew: boolean;
}

export function NewPlotBadge({ isNew }: NewPlotBadgeProps) {
  if (!isNew) return null;
  return (
    <Badge className="h-4 bg-emerald-100 px-1.5 text-[10px] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
      New
    </Badge>
  );
}
