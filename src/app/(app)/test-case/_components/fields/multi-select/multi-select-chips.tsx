import { MoreChip } from './more-chip';

const MAX_VISIBLE_CHIPS = 3;

interface MultiSelectChipsProps {
  labels: readonly string[];
  placeholder: string;
}

export function MultiSelectChips({
  labels,
  placeholder,
}: MultiSelectChipsProps) {
  if (labels.length === 0) {
    return <span className="text-muted-foreground">{placeholder}</span>;
  }
  const hidden = labels.length - MAX_VISIBLE_CHIPS;

  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1">
      {labels.slice(0, MAX_VISIBLE_CHIPS).map((label) => (
        <span
          key={label}
          className="rounded-md border bg-muted px-1.5 py-0.5 text-xs font-medium"
        >
          {label}
        </span>
      ))}
      <MoreChip count={hidden} />
    </span>
  );
}
