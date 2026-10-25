import { BOOLEAN_SCORE_OPTIONS } from '../../../_constants/boolean-score-options';
import { ScoreToggle } from './score-toggle';

type BooleanScoreTogglesProps = {
  groupKey: string;
};

export function BooleanScoreToggles({ groupKey }: BooleanScoreTogglesProps) {
  return (
    <>
      {BOOLEAN_SCORE_OPTIONS.map((option) => (
        <ScoreToggle
          key={option.label}
          groupKey={groupKey}
          value={option.value}
          label={option.label}
        />
      ))}
    </>
  );
}
