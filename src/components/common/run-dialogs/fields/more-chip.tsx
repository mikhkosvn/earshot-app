interface MoreChipProps {
  count: number;
}

export function MoreChip({ count }: MoreChipProps) {
  if (count <= 0) return null;
  return (
    <span className="rounded-md border bg-muted px-1.5 py-0.5 text-xs font-medium">
      + {count} more
    </span>
  );
}
