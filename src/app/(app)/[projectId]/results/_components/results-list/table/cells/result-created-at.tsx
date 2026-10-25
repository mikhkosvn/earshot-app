import { createdAtText } from '../../../../_utils/results-list/result-format';

type ResultCreatedAtProps = {
  date: Date;
};

export function ResultCreatedAt({ date }: ResultCreatedAtProps) {
  return (
    <time
      dateTime={new Date(date).toISOString()}
      suppressHydrationWarning
      className="whitespace-nowrap"
    >
      {createdAtText(date)}
    </time>
  );
}
