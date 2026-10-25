import { GAUGE_ARC_PATH } from '../../_constants/result-detail';

type ScoreGaugeArcProps = {
  percent: number;
};

export function ScoreGaugeArc({ percent }: ScoreGaugeArcProps) {
  if (percent <= 0) return null;

  return (
    <path
      d={GAUGE_ARC_PATH}
      pathLength={100}
      fill="none"
      strokeWidth={12}
      strokeLinecap="round"
      strokeDasharray={`${percent} 100`}
      className="stroke-green-500"
    />
  );
}
