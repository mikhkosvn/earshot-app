interface FailureLimitHintProps {
  limit: number | null;
}

const hintOf = (limit: number | null) => {
  if (limit === null) return 'Every failure will be analysed. No daily limit.';
  return `Up to ${limit} failures per metric per day will be analysed.`;
};

export function FailureLimitHint({ limit }: FailureLimitHintProps) {
  return (
    <p className="rounded-md border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
      {hintOf(limit)}
    </p>
  );
}
