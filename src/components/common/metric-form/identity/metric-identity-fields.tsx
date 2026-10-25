'use client';

import { useSlugAutofill } from '../_hooks/use-slug-autofill';
import { MetricNameField } from './metric-name-field';
import { MetricSlugField } from './metric-slug-field';

export function MetricIdentityFields() {
  const { fillSlug, stopAutofill } = useSlugAutofill();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MetricNameField onNameChange={fillSlug} />
      <MetricSlugField onSlugEdit={stopAutofill} />
    </div>
  );
}
