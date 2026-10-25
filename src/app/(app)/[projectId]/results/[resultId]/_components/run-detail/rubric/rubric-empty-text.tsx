type RubricEmptyTextProps = {
  count: number;
};

export function RubricEmptyText({ count }: RubricEmptyTextProps) {
  if (count > 0) return null;
  return (
    <p className="text-xs text-muted-foreground">
      No rubric condition applies to this run.
    </p>
  );
}
