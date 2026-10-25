import { TestCallOfferKind } from '../../../_constants/test-call-offer';

type CheckSummaryTextProps = {
  kind: TestCallOfferKind;
  count: string;
};

export function CheckSummaryText({ kind, count }: CheckSummaryTextProps) {
  if (kind === TestCallOfferKind.saved) {
    return (
      <p>Configuration looks good on {count}, and your changes are saved.</p>
    );
  }
  return <p>Ready on {count}.</p>;
}
