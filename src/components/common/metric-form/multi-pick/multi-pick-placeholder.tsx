interface MultiPickPlaceholderProps {
  count: number;
  placeholder: string;
}

export function MultiPickPlaceholder({
  count,
  placeholder,
}: MultiPickPlaceholderProps) {
  if (count > 0) return null;
  return placeholder;
}
