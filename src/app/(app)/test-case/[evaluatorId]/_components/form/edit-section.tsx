import type { ReactNode } from 'react';

type EditSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function EditSection({ id, title, children }: EditSectionProps) {
  return (
    <fieldset
      id={id}
      className="flex scroll-mt-4 flex-col gap-5 rounded-lg border p-4"
    >
      <legend className="px-1 font-mono text-xs text-muted-foreground">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}
