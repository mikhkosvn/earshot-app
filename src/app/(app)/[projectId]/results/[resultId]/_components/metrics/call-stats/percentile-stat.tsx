import { formatOptionalNumber } from '../../../_utils/number-format';

type PercentileStatProps = {
  label: string;
  value: number | undefined;
};

export function PercentileStat({ label, value }: PercentileStatProps) {
  return (
    <span className="text-xs whitespace-nowrap text-muted-foreground">
      {label}{' '}
      <span className="font-medium text-foreground tabular-nums">
        {formatOptionalNumber(value)}
      </span>
    </span>
  );
}
