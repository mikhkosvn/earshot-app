type ImproveRunLabelProps = {
  isPending: boolean;
};

export function ImproveRunLabel({ isPending }: ImproveRunLabelProps) {
  if (isPending) return 'Improving...';
  return 'Improve';
}
