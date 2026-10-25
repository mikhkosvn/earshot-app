'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { CronPart } from '../../_constants/cron-help';

type CronPartInputProps = {
  index: number;
  part: CronPart;
  value: string;
  onValueChange: (value: string) => void;
};

export function CronPartInput({
  index,
  part,
  value,
  onValueChange,
}: CronPartInputProps) {
  const id = `monitor-cron-part-${index}`;

  return (
    <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border bg-background p-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {part.label}
      </Label>
      <Input
        id={id}
        value={value}
        placeholder="*"
        onChange={(event) => onValueChange(event.target.value)}
        className="font-mono"
      />
      <p className="text-xs text-muted-foreground">{part.hint}</p>
    </div>
  );
}
