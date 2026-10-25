interface ReviewRebuildLabelProps {
  isPending: boolean;
}

export function ReviewRebuildLabel({ isPending }: ReviewRebuildLabelProps) {
  if (isPending) return 'Rebuilding...';
  return 'Rebuild';
}
