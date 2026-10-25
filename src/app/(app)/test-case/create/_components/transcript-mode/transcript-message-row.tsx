'use client';

import { ArrowLeftRightIcon, Trash2Icon } from 'lucide-react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { NullableNumberInput } from '@/app/(app)/test-case/_components/fields/nullable-number-input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { TranscriptRole } from '@/server/call-engine/constants';

import {
  TranscriptPlaceholder,
  TranscriptSpeakerLabel,
} from '../../_constants/transcript-example';
import type { TranscriptFormValues } from '../../_schemas/transcript-form-schema';
import { TranscriptRoleAvatar } from './transcript-role-avatar';

type TranscriptMessageRowProps = {
  index: number;
  onRemove: () => void;
};

const swapRole = (role: TranscriptRole) => {
  if (role === TranscriptRole.main_agent) return TranscriptRole.testing_agent;
  return TranscriptRole.main_agent;
};

export function TranscriptMessageRow({
  index,
  onRemove,
}: TranscriptMessageRowProps) {
  const { control, setValue } = useFormContext<TranscriptFormValues>();
  const role = useWatch({ control, name: `turns.${index}.role` });
  const isCaller = role === TranscriptRole.testing_agent;

  return (
    <div className={cn('flex gap-3', isCaller && 'flex-row-reverse')}>
      <TranscriptRoleAvatar role={role} />
      <div
        className={cn('flex w-4/5 flex-col gap-1.5', isCaller && 'items-end')}
      >
        <div
          className={cn(
            'flex items-center gap-2',
            isCaller && 'flex-row-reverse',
          )}
        >
          <span className="text-xs font-medium">
            {TranscriptSpeakerLabel[role]}
          </span>
          <Controller
            name={`turns.${index}.startTime`}
            control={control}
            render={({ field }) => (
              <div className="flex w-24 items-center gap-1 text-xs text-muted-foreground">
                <NullableNumberInput
                  id={`transcript-time-${index}`}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="time"
                  min={0}
                />
                s
              </div>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="swap"
            onClick={() =>
              setValue(`turns.${index}.role`, swapRole(role), {
                shouldDirty: true,
              })
            }
          >
            <ArrowLeftRightIcon />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="delete"
            onClick={onRemove}
          >
            <Trash2Icon />
          </Button>
        </div>
        <Controller
          name={`turns.${index}.content`}
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              aria-label={`Message ${index + 1}`}
              placeholder={TranscriptPlaceholder[role]}
              className="min-h-14 w-full"
            />
          )}
        />
      </div>
    </div>
  );
}
