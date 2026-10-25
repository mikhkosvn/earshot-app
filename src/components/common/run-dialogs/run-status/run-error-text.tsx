type RunErrorTextProps = {
  message: string | null;
};

export function RunErrorText({ message }: RunErrorTextProps) {
  if (!message) return null;
  return <span className="text-xs text-destructive">{message}</span>;
}
