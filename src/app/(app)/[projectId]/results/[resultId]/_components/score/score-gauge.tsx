import { GAUGE_ARC_PATH } from '../../_constants/result-detail';
import { formatPercent } from '../../_utils/number-format';
import { ScoreGaugeArc } from './score-gauge-arc';

type ScoreGaugeProps = {
  percent: number;
};

export function ScoreGauge({ percent }: ScoreGaugeProps) {
  return (
    <div
      className="relative h-20 w-36 shrink-0"
      role="img"
      aria-label={`${formatPercent(percent)} of runs passed`}
    >
      <svg viewBox="0 0 140 80" className="size-full" aria-hidden>
        <path
          d={GAUGE_ARC_PATH}
          pathLength={100}
          fill="none"
          strokeWidth={12}
          strokeLinecap="round"
          className="stroke-muted"
        />
        <ScoreGaugeArc percent={percent} />
      </svg>
      <span className="absolute inset-x-0 bottom-0 text-center text-2xl font-semibold">
        {formatPercent(percent)}
      </span>
    </div>
  );
}
