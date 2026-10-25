import { summaryLines } from '../../../_utils/summary-lines';
import { ProposalSummaryLine } from './proposal-summary-line';

interface ProposalSummaryProps {
  summary: string | null;
}

export function ProposalSummary({ summary }: ProposalSummaryProps) {
  if (!summary) return null;

  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-blue-200 bg-blue-50/60 p-3 text-sm dark:border-blue-900 dark:bg-blue-950/40">
      <h3 className="font-medium text-blue-800 dark:text-blue-300">
        What the optimised metric does
      </h3>
      {summaryLines(summary).map((line, index) => (
        <ProposalSummaryLine key={`${index}-${line.text}`} line={line} />
      ))}
    </div>
  );
}
