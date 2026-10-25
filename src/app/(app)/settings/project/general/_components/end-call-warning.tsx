import { InfoIcon } from 'lucide-react';

export function EndCallWarning() {
  return (
    <div className="flex gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
      <p>
        <strong>Warning:</strong> This setting will apply to all evaluators. To
        override for a specific evaluator, go to{' '}
        <strong>Evaluator → Edit → Configuration → End Call Tools</strong>.
      </p>
    </div>
  );
}
