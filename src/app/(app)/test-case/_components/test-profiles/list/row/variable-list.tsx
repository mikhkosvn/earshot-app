import type { TestProfileVariableView } from '@/server/test-profiles/types';

interface VariableListProps {
  title: string;
  variables: readonly TestProfileVariableView[];
}

export function VariableList({ title, variables }: VariableListProps) {
  return (
    <section className="flex flex-col gap-1">
      <h4 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h4>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-xs">
        {variables.map((variable) => (
          <div key={variable.key} className="contents">
            <dt className="text-muted-foreground">{variable.key}</dt>
            <dd className="break-all">{variable.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
