import { Input } from '@/components/ui/input';

import { FilterFieldKind } from '../../_constants/call-filter-fields';

interface MetadataKeyInputProps {
  kind: FilterFieldKind;
  value: string;
  onChange: (value: string) => void;
}

export function MetadataKeyInput({
  kind,
  value,
  onChange,
}: MetadataKeyInputProps) {
  if (kind !== FilterFieldKind.metadata) return null;

  return (
    <Input
      value={value}
      placeholder="Key"
      aria-label="Metadata key"
      className="h-7 w-28 text-xs md:text-xs"
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
