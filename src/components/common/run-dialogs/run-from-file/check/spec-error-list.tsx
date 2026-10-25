import type { SpecIssue } from '@/server/runs/types';

import { problemCountText } from '../../_utils/run-dialog-text';

type SpecErrorListProps = {
  errors: SpecIssue[];
};

export function SpecErrorList({ errors }: SpecErrorListProps) {
  return (
    <div className="flex flex-col gap-1.5" role="alert">
      <p className="text-sm font-medium text-destructive">
        {problemCountText(errors.length)}
      </p>
      <ul className="max-h-40 overflow-y-auto rounded-lg border px-3 py-1 text-xs">
        {errors.map((error) => (
          <li key={`${error.path}:${error.message}`} className="py-1">
            <code className="font-mono font-medium">{error.path}</code>:{' '}
            {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
