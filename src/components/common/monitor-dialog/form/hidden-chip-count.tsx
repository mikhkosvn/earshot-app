type HiddenChipCountProps = {
  count: number;
};

export function HiddenChipCount({ count }: HiddenChipCountProps) {
  if (count <= 0) return null;

  return <span className="text-xs text-muted-foreground">+{count}</span>;
}
