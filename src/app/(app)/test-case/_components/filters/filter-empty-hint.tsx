type FilterEmptyHintProps = {
  count: number;
};

export function FilterEmptyHint({ count }: FilterEmptyHintProps) {
  if (count > 0) return null;
  return (
    <p className="py-6 text-center text-xs text-muted-foreground">
      No options found.
    </p>
  );
}
