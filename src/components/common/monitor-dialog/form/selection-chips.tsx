import { HiddenChipCount } from './hidden-chip-count';

const MAX_VISIBLE_CHIPS = 3;

interface SelectionChipsProps {
  labels: readonly string[];
  placeholder: string;
}

export function SelectionChips({ labels, placeholder }: SelectionChipsProps) {
  if (labels.length === 0) {
    return <span className="text-muted-foreground">{placeholder}</span>;
  }
  const hidden = labels.length - MAX_VISIBLE_CHIPS;

  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1">
      {labels.slice(0, MAX_VISIBLE_CHIPS).map((label, index) => (
        <span
          key={`${label}-${index}`}
          className="max-w-40 truncate rounded-md border bg-muted px-1.5 py-0.5 text-xs font-medium"
        >
          {label}
        </span>
      ))}
      <HiddenChipCount count={hidden} />
    </span>
  );
}
