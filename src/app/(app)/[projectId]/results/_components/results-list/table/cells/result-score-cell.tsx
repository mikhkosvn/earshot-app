import { scoreText } from '../../../../_utils/results-list/result-format';

interface ResultScoreCellProps {
  successRate: number | null;
}

export function ResultScoreCell({ successRate }: ResultScoreCellProps) {
  if (successRate === null) {
    return <span className="text-muted-foreground">{scoreText(null)}</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="w-9 font-medium">{scoreText(successRate)}</span>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${successRate}%` }}
        />
      </div>
    </div>
  );
}
