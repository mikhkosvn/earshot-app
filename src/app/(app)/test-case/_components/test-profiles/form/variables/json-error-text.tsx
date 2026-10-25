type JsonErrorTextProps = {
  error: string | null;
};

export function JsonErrorText({ error }: JsonErrorTextProps) {
  if (!error) return null;
  return <p className="text-xs text-destructive">{error}</p>;
}
