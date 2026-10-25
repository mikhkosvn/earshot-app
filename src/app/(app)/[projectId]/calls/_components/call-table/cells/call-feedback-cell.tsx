import { FeedbackEditButton } from '../../call-review/feedback-edit-button';

interface CallFeedbackCellProps {
  callLogId: number;
  feedback: string | null;
}

export function CallFeedbackCell({
  callLogId,
  feedback,
}: CallFeedbackCellProps) {
  return (
    <div className="group/feedback flex min-w-40 items-center gap-1">
      <span className="max-w-60 truncate">{feedback}</span>
      <FeedbackEditButton
        callLogId={callLogId}
        feedback={feedback}
        className="opacity-0 group-hover/feedback:opacity-100 focus-visible:opacity-100 data-popup-open:opacity-100"
      />
    </div>
  );
}
