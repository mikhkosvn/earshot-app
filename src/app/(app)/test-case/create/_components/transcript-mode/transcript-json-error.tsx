interface TranscriptJsonErrorProps {
  error: string | null;
}

export function TranscriptJsonError({ error }: TranscriptJsonErrorProps) {
  if (!error) return null;
  return <p className="text-xs text-destructive">{error}</p>;
}
