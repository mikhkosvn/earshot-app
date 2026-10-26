export const RunReviewsActionOperation = {
  updateRunEvaluation: 'run_reviews.update_run_evaluation',
  updateRunFeedback: 'run_reviews.update_run_feedback',
  voteMetric: 'run_reviews.vote_metric',
} as const;

export type RunReviewsActionOperation =
  (typeof RunReviewsActionOperation)[keyof typeof RunReviewsActionOperation];
