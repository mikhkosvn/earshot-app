interface FailureTrendEmptyProps {
  count: number;
}

export function FailureTrendEmpty({ count }: FailureTrendEmptyProps) {
  if (count > 0) return null;
  return (
    <p className="text-[11px] text-muted-foreground">
      No failure categories in this range.
    </p>
  );
}
