import { CheckIcon } from 'lucide-react';

type WizardStepMarkerProps = {
  number: number;
  done: boolean;
};

export function WizardStepMarker({ number, done }: WizardStepMarkerProps) {
  if (done) {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-green-600 text-white">
        <CheckIcon className="size-3" />
      </span>
    );
  }
  return (
    <span className="flex size-5 items-center justify-center rounded-full border text-xs">
      {number}
    </span>
  );
}
