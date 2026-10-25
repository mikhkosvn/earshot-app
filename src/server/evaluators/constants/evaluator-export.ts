export const EvaluatorExportFormat = {
  csv: 'csv',
  json: 'json',
} as const;

export type EvaluatorExportFormat =
  (typeof EvaluatorExportFormat)[keyof typeof EvaluatorExportFormat];

export const EvaluatorExportFormatLabel: Record<EvaluatorExportFormat, string> =
  {
    [EvaluatorExportFormat.csv]: 'CSV (.csv)',
    [EvaluatorExportFormat.json]: 'Test suite spec (.json)',
  };

export const EvaluatorExportButtonLabel: Record<EvaluatorExportFormat, string> =
  {
    [EvaluatorExportFormat.csv]: 'Export as CSV',
    [EvaluatorExportFormat.json]: 'Export as JSON',
  };

export const EvaluatorExportMimeType: Record<EvaluatorExportFormat, string> = {
  [EvaluatorExportFormat.csv]: 'text/csv',
  [EvaluatorExportFormat.json]: 'application/json',
};

export const TEST_SUITE_SPEC_VERSION = '1';
