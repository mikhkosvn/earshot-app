interface FilterRowsEmptyProps {
  count: number;
}

export function FilterRowsEmpty({ count }: FilterRowsEmptyProps) {
  if (count > 0) return null;
  return <p className="text-xs text-muted-foreground">No filters yet.</p>;
}
