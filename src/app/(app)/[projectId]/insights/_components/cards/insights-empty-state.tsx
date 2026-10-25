import { EnableInsightsButton } from '../enable/enable-insights-button';

export function InsightsEmptyState() {
  return (
    <section className="flex flex-col items-center gap-3 rounded-lg border bg-background px-6 py-12 text-center">
      <p className="text-sm font-medium">
        No metrics have insights enabled yet.
      </p>
      <p className="max-w-md text-xs text-muted-foreground">
        Pick a metric and tell us what a passing call looks like. We&apos;ll
        investigate the calls that don&apos;t meet it and group them into
        recurring failure modes.
      </p>
      <EnableInsightsButton
        label="Enable insights for a metric"
        variant="default"
      />
    </section>
  );
}
