interface RubricAndChipProps {
  index: number;
}

export function RubricAndChip({ index }: RubricAndChipProps) {
  if (index === 0) return null;

  return (
    <span className="w-fit rounded-md border bg-muted/40 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
      AND
    </span>
  );
}
