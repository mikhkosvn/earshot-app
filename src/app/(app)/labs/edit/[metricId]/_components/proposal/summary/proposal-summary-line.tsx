import {
  type SummaryLine,
  SummaryLineKind,
} from '../../../_utils/summary-lines';

type ProposalSummaryLineProps = {
  line: SummaryLine;
};

export function ProposalSummaryLine({ line }: ProposalSummaryLineProps) {
  if (line.kind === SummaryLineKind.bullet) {
    return <p className="ml-4 list-item list-disc">{line.text}</p>;
  }
  if (line.kind === SummaryLineKind.labeled) {
    return (
      <p>
        <span className="font-semibold">{line.label}</span> {line.text}
      </p>
    );
  }
  return <p>{line.text}</p>;
}
