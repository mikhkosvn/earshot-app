'use client';

import { useMetricDetail } from '../../_hooks/use-metric-detail';
import { ConfigurationField } from './configuration-field';

export function ConfigurationFields() {
  const metric = useMetricDetail();
  const keys = Object.keys(metric.configuration ?? {});

  if (keys.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {keys.map((key) => (
        <ConfigurationField key={key} configKey={key} />
      ))}
    </div>
  );
}
