interface ResultFilterRowsEmptyProps {
  count: number;
}

export function ResultFilterRowsEmpty({ count }: ResultFilterRowsEmptyProps) {
  if (count > 0) return null;
  return <p className="text-xs text-muted-foreground">No filters yet.</p>;
}
