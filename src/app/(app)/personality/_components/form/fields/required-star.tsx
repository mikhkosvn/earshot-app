interface RequiredStarProps {
  required: boolean;
}

export function RequiredStar({ required }: RequiredStarProps) {
  if (!required) return null;
  return <span className="text-destructive">&nbsp;*</span>;
}
