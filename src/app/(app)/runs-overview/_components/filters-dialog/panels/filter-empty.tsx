interface FilterEmptyProps {
  count: number;
}

export function FilterEmpty({ count }: FilterEmptyProps) {
  if (count > 0) return null;
  return (
    <div className="flex flex-col items-center gap-1 py-10 text-center">
      <p className="text-sm font-medium">No results found</p>
      <p className="text-xs text-muted-foreground">
        Try adjusting your filters
      </p>
    </div>
  );
}
