type ApplyProposalLabelProps = {
  isPending: boolean;
};

export function ApplyProposalLabel({ isPending }: ApplyProposalLabelProps) {
  if (isPending) return 'Applying...';
  return 'Apply to metric';
}
