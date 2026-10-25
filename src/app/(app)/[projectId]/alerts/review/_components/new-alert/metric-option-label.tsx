import type { MetricEvalType } from '@/generated/prisma/enums';

type MetricOptionLabelProps = {
  name: string;
  evalType: MetricEvalType;
};

export function MetricOptionLabel({ name, evalType }: MetricOptionLabelProps) {
  return (
    <span className="flex items-baseline gap-2">
      <span>{name}</span>
      <span className="text-[10px] text-muted-foreground">{evalType}</span>
    </span>
  );
}
