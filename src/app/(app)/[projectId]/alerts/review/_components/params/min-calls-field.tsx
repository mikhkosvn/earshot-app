'use client';

import { NumberParamField } from './number-param-field';

export function MinCallsField() {
  return (
    <div className="flex flex-col gap-1.5">
      <NumberParamField
        name="params.minCalls"
        label="Minimum calls before firing"
      />
      <p className="text-[11px] text-muted-foreground">
        Only alert once a newly-detected category has at least this many calls.
        Set to 1 to fire the moment it appears.
      </p>
    </div>
  );
}
