import { ScoreToggle } from './score-toggle';

interface NaScoreToggleProps {
  groupKey: string;
}

export function NaScoreToggle({ groupKey }: NaScoreToggleProps) {
  return <ScoreToggle groupKey={groupKey} value={null} label="N/A" />;
}
