interface OptionIdLabelProps {
  id: number | string;
  label: string;
}

export function OptionIdLabel({ id, label }: OptionIdLabelProps) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="rounded-sm border bg-muted px-1 font-mono text-xs text-muted-foreground">
        {id}
      </span>
      <span className="truncate">{label}</span>
    </span>
  );
}
