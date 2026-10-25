interface SpecFileNameProps {
  fileName: string | null;
}

export function SpecFileName({ fileName }: SpecFileNameProps) {
  if (!fileName) return null;
  return (
    <span className="text-xs font-medium text-foreground">{fileName}</span>
  );
}
