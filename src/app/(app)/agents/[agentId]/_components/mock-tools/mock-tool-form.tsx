'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { MockToolItem } from '@/server/agents/types';

import { MOCK_TOOL_MAPPINGS_HELP } from '../../_constants/mock-tool-defaults';
import { useMockToolForm } from '../../_hooks/use-mock-tool-form';
import { MockToolSubmitLabel } from './mock-tool-submit-label';

type MockToolFormProps = {
  tool: MockToolItem | null;
  onSaved: () => void;
};

export function MockToolForm({ tool, onSaved }: MockToolFormProps) {
  const { form, onSubmit, isPending } = useMockToolForm(tool, onSaved);

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.stopPropagation();
        void onSubmit(event);
      }}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="mock-tool-name">Tool Name</FieldLabel>
            <Input
              {...field}
              id="mock-tool-name"
              placeholder="e.g., tool_user_data"
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel htmlFor="mock-tool-description">
              Description (Optional)
            </FieldLabel>
            <Textarea
              {...field}
              id="mock-tool-description"
              placeholder="e.g., This tool retrieves user data from the database"
            />
          </Field>
        )}
      />
      <Controller
        name="mappingsJson"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="mock-tool-mappings">
              Input/Output Mappings (JSON)
            </FieldLabel>
            <Textarea
              {...field}
              id="mock-tool-mappings"
              spellCheck={false}
              aria-invalid={fieldState.invalid}
              className="min-h-60 font-mono text-xs"
            />
            <FieldDescription>{MOCK_TOOL_MAPPINGS_HELP}</FieldDescription>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          <MockToolSubmitLabel tool={tool} pending={isPending} />
        </Button>
      </DialogFooter>
    </form>
  );
}
