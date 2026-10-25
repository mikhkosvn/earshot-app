interface RequiredMarkProps {
  required: boolean;
}

export function RequiredMark({ required }: RequiredMarkProps) {
  if (!required) return null;
  return <span className="text-destructive">*</span>;
}
