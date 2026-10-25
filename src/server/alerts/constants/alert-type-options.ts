import { AlertType, MetricEvalType } from '@/generated/prisma/enums';

export const ALERT_TYPES_BY_EVAL_TYPE: Record<MetricEvalType, AlertType[]> = {
  [MetricEvalType.binary]: [
    AlertType.normal,
    AlertType.significant_change,
    AlertType.insight_new_mode,
    AlertType.insight_uptick,
  ],
  [MetricEvalType.numeric]: [
    AlertType.normal,
    AlertType.threshold,
    AlertType.significant_change,
    AlertType.insight_new_mode,
    AlertType.insight_uptick,
  ],
  [MetricEvalType.continuous_qualitative]: [
    AlertType.threshold,
    AlertType.significant_change,
    AlertType.insight_new_mode,
    AlertType.insight_uptick,
  ],
  [MetricEvalType.enum]: [
    AlertType.normal,
    AlertType.insight_new_mode,
    AlertType.insight_uptick,
  ],
};

export const DEFAULT_ALERT_TYPE: Record<MetricEvalType, AlertType> = {
  [MetricEvalType.binary]: AlertType.normal,
  [MetricEvalType.numeric]: AlertType.significant_change,
  [MetricEvalType.continuous_qualitative]: AlertType.significant_change,
  [MetricEvalType.enum]: AlertType.normal,
};

export const isAlertTypeAllowed = (evalType: MetricEvalType, type: AlertType) =>
  ALERT_TYPES_BY_EVAL_TYPE[evalType].includes(type);
