import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

interface RubricItemIconProps {
  passed: boolean;
}

export function RubricItemIcon({ passed }: RubricItemIconProps) {
  if (passed) {
    return (
      <CircleCheckIcon
        aria-label="Passed"
        className="size-4 text-emerald-600"
      />
    );
  }
  return <CircleXIcon aria-label="Failed" className="size-4 text-red-600" />;
}
