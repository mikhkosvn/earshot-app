'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Language } from '@/generated/prisma/enums';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useIsSavingPersonality } from '../../_hooks/form/use-is-saving-personality';

type PersonalityFormFooterProps = {
  status: ReactNode;
  submitLabel: string;
};

export function PersonalityFormFooter({
  status,
  submitLabel,
}: PersonalityFormFooterProps) {
  const isSaving = useIsSavingPersonality();

  return (
    <div className="sticky bottom-0 flex items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2.5">
      <p className="text-xs text-muted-foreground">{status}</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <Link
              href={UrlGenerator.personality({
                values: { language: Language.en },
              })}
            />
          }
        >
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isSaving}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
