import { FeedbackEditButton } from '../../call-review/feedback-edit-button';

interface CallFeedbackCardProps {
  callLogId: number;
  feedback: string | null;
}

const feedbackText = (feedback: string | null) => {
  if (feedback) return feedback;
  return 'No feedback provided';
};

export function CallFeedbackCard({
  callLogId,
  feedback,
}: CallFeedbackCardProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm">
      <p className="min-w-0">
        <span className="font-medium">Feedback: </span>
        {feedbackText(feedback)}
      </p>
      <FeedbackEditButton
        callLogId={callLogId}
        feedback={feedback}
        className="border"
      />
    </div>
  );
}
