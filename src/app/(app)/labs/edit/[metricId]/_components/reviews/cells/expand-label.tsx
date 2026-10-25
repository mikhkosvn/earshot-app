type ExpandLabelProps = {
  isExpanded: boolean;
  collapsedLabel: string;
};

export function ExpandLabel({ isExpanded, collapsedLabel }: ExpandLabelProps) {
  if (isExpanded) return 'Show less';
  return collapsedLabel;
}
