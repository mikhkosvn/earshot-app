import { CheckIcon, MinusIcon } from 'lucide-react';

type WorkflowPathIconProps = {
  covered: boolean;
};

export function WorkflowPathIcon({ covered }: WorkflowPathIconProps) {
  if (covered) {
    return <CheckIcon className="size-4 text-green-600" aria-label="Covered" />;
  }
  return <MinusIcon className="size-4" aria-label="Not covered" />;
}
