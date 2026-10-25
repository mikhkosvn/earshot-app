import type { MetricReference } from '@/server/metrics/types';

interface MetricDependenciesProps {
  dependencies: readonly MetricReference[];
}

export function MetricDependencies({ dependencies }: MetricDependenciesProps) {
  if (dependencies.length === 0) return null;

  return (
    <p>
      <span className="font-medium">Uses results from: </span>
      {dependencies.map((dependency) => dependency.name).join(', ')}
    </p>
  );
}
