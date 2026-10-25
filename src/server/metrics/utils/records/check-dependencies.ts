import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { MAX_DEPENDENCY_CHAIN_DEPTH } from '@/server/metrics/constants/definition/metric-limits';
import { ActionError } from '@/server/common/run-action';

interface CheckDependenciesArgs {
  projectId: number;
  metricId: number | null;
  dependencyIds: number[];
}

const buildGraph = async (tx: Prisma.TransactionClient, projectId: number) => {
  const edges = await tx.metricDependency.findMany({
    where: { metric: { projectId } },
    select: { metricId: true, dependsOnMetricId: true },
  });
  const graph = new Map<number, number[]>();
  for (const edge of edges) {
    graph.set(edge.metricId, [
      ...(graph.get(edge.metricId) ?? []),
      edge.dependsOnMetricId,
    ]);
  }
  return graph;
};

const chainDepth = (
  graph: Map<number, number[]>,
  metricId: number,
  target: number | null,
  path: Set<number>,
): number => {
  if (target !== null && metricId === target) {
    throw new ActionError('A metric cannot depend on itself through a chain.');
  }
  if (path.has(metricId)) return 0;
  const children = graph.get(metricId) ?? [];
  const nextPath = new Set(path).add(metricId);
  return (
    1 +
    Math.max(
      0,
      ...children.map((child) => chainDepth(graph, child, target, nextPath)),
    )
  );
};

export const checkDependencies = async (
  tx: Prisma.TransactionClient,
  { projectId, metricId, dependencyIds }: CheckDependenciesArgs,
) => {
  if (dependencyIds.length === 0) return;
  if (metricId !== null && dependencyIds.includes(metricId)) {
    throw new ActionError('A metric cannot use its own results.');
  }
  const found = await tx.metric.count({
    where: { projectId, id: { in: dependencyIds } },
  });
  if (found !== new Set(dependencyIds).size) {
    throw new ActionError('Pick metrics of this project only.');
  }
  const graph = await buildGraph(tx, projectId);
  const depth = Math.max(
    ...dependencyIds.map((id) => chainDepth(graph, id, metricId, new Set())),
  );
  if (depth >= MAX_DEPENDENCY_CHAIN_DEPTH) {
    throw new ActionError(
      `A chain of metric results can have ${MAX_DEPENDENCY_CHAIN_DEPTH} levels or fewer.`,
    );
  }
};
