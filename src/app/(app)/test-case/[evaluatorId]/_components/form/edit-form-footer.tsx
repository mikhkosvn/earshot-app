'use client';

import Link from 'next/link';
import { useFormState } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

type EditFormFooterProps = {
  isPending: boolean;
};

export function EditFormFooter({ isPending }: EditFormFooterProps) {
  const projectId = useCurrentProjectId();
  const { isDirty } = useFormState();

  return (
    <div className="sticky bottom-0 flex justify-end gap-2 rounded-b-xl border-t bg-background/95 p-3 backdrop-blur-sm">
      <Button
        variant="outline"
        nativeButton={false}
        render={
          <Link
            href={UrlGenerator.evaluators({ values: { project: projectId } })}
          />
        }
      >
        Cancel
      </Button>
      <Button type="submit" disabled={!isDirty || isPending}>
        Update Evaluator
      </Button>
    </div>
  );
}
