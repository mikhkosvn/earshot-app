type VariableHintProps = {
  codes: [string, string, string];
};

export function VariableHint({ codes }: VariableHintProps) {
  const [field, firstExample, secondExample] = codes;

  return (
    <p className="flex flex-wrap items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
      Hint: Use
      <code className="rounded-sm border bg-background px-1.5 py-0.5 font-sans text-[11px] text-foreground">
        {field}
      </code>
      e.g.
      <code className="rounded-sm border bg-background px-1.5 py-0.5 font-sans text-[11px] text-foreground">
        {firstExample}
      </code>
      or
      <code className="rounded-sm border bg-background px-1.5 py-0.5 font-sans text-[11px] text-foreground">
        {secondExample}
      </code>
    </p>
  );
}
