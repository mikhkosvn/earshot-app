import { EMPTY_VALUE } from '../../_constants/result-detail';

interface AiSummarySectionProps {
  title: string;
  text: string | null;
}

export function AiSummarySection({ title, text }: AiSummarySectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <p className="text-sm whitespace-pre-line">{text ?? EMPTY_VALUE}</p>
    </div>
  );
}
