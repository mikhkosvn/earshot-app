import type { PatternSampleView } from '@/server/metrics/types';

import { SampleSourceButton } from '../sample-source-button';
import { SampleVerdict } from '../sample-verdict';

type OtherCallRowProps = {
  sample: PatternSampleView;
};

export function OtherCallRow({ sample }: OtherCallRowProps) {
  return (
    <li className="flex items-center justify-between gap-2 px-3 py-2">
      <SampleSourceButton label={sample.label} />
      <SampleVerdict value={sample.verdict} />
    </li>
  );
}
