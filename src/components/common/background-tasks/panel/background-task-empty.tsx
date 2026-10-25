import { SparklesIcon } from 'lucide-react';

export function BackgroundTaskEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 px-3 py-6 text-sm text-muted-foreground">
      <SparklesIcon className="size-5" aria-hidden />
      <p>No recent generation tasks</p>
    </div>
  );
}
