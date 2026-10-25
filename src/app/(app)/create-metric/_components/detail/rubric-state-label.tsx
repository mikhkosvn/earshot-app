interface RubricStateLabelProps {
  checked: boolean;
}

export function RubricStateLabel({ checked }: RubricStateLabelProps) {
  if (checked) return 'Yes';
  return 'No';
}
