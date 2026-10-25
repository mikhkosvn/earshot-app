'use client';

import type { ComponentProps } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { CodeLineNumbers } from './code-line-numbers';

type CodeEditorSurfaceProps = Omit<
  ComponentProps<'textarea'>,
  'value' | 'onChange'
> & {
  value: string;
  onValueChange: (value: string) => void;
};

export function CodeEditorSurface({
  value,
  onValueChange,
  className,
  ...props
}: CodeEditorSurfaceProps) {
  return (
    <div
      className={cn(
        'flex overflow-auto rounded-lg border bg-muted/30 has-focus-visible:border-ring has-aria-invalid:border-destructive',
        className,
      )}
    >
      <CodeLineNumbers value={value} />
      <Textarea
        {...props}
        value={value}
        wrap="off"
        spellCheck={false}
        onChange={(event) => onValueChange(event.target.value)}
        className="min-h-full flex-1 resize-none rounded-none border-0 bg-background px-2 py-1.5 font-mono text-xs/5 shadow-none focus-visible:ring-0 aria-invalid:ring-0 md:text-xs dark:bg-background"
      />
    </div>
  );
}
