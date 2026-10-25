import { numberText } from '../../../_utils/share-format';

type SharedPercentileProps = {
  label: string;
  value: number;
};

export function SharedPercentile({ label, value }: SharedPercentileProps) {
  return (
    <span className="text-[11px] text-muted-foreground">
      {label}{' '}
      <span className="font-medium text-foreground tabular-nums">
        {numberText(value)}
      </span>
    </span>
  );
}
