'use client';

import { Button } from '@/components/ui/button';

interface ConfiguredSecretProps {
  label: string;
  description?: string;
  statusText: string;
  onUpdate: () => void;
}

export function ConfiguredSecret({
  label,
  description,
  statusText,
  onUpdate,
}: ConfiguredSecretProps) {
  return (
    <div className="flex flex-col gap-1.5 p-3">
      <p className="text-xs font-medium">{label}</p>
      <div className="flex items-center justify-between rounded-lg border bg-background px-2.5 py-1.5 text-xs">
        <span>{statusText}</span>
        <Button type="button" variant="ghost" size="xs" onClick={onUpdate}>
          Update
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
