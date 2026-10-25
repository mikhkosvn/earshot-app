import { WizardStepMarker } from './wizard-step-marker';

type WizardStepBadgeProps = {
  number: number;
  label: string;
  active: boolean;
  done: boolean;
};

export function WizardStepBadge({
  number,
  label,
  active,
  done,
}: WizardStepBadgeProps) {
  return (
    <div
      data-active={active}
      className="flex items-center gap-2 text-muted-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
    >
      <WizardStepMarker number={number} done={done} />
      {label}
    </div>
  );
}
