import { CircleCheckIcon } from 'lucide-react';

export function RubricInfoBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
      <span className="flex items-center gap-1.5 text-sm">
        <CircleCheckIcon className="size-4" />
        How rules are evaluated
      </span>
      <span className="flex items-center gap-1.5">
        <span className="rounded-sm border border-blue-300 bg-background px-1.5 py-0.5 font-semibold dark:border-blue-800">
          ALL
        </span>
        conditions must pass for a success
      </span>
      <span className="h-3 w-px bg-blue-300 dark:bg-blue-800" />
      <span>
        Conditions set to <span className="font-medium">None</span> are skipped
      </span>
    </div>
  );
}
