'use client';

import { XIcon } from 'lucide-react';
import type { FieldError as HookFieldError } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { enumRowError } from '../_utils/enum-row-error';

interface EnumKeyRowProps {
  index: number;
  value: string;
  error: HookFieldError | undefined;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  onRemove: () => void;
}

export function EnumKeyRow({
  index,
  value,
  error,
  disabled,
  onValueChange,
  onRemove,
}: EnumKeyRowProps) {
  const itemError = enumRowError(error, index);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Input
          value={value}
          disabled={disabled}
          aria-label={`Enum key ${index + 1}`}
          aria-invalid={Boolean(itemError)}
          placeholder="Enter a key"
          onChange={(event) => onValueChange(event.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Remove enum key ${index + 1}`}
          disabled={disabled}
          onClick={onRemove}
        >
          <XIcon />
        </Button>
      </div>
      <FieldError errors={[itemError]} />
    </div>
  );
}
