'use client';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { WorkflowPathItem } from './workflow-path-item';

export function WorkflowPathList() {
  const { workflow } = useResultDetail();

  if (workflow.paths.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        This result has no workflow paths yet.
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-2">
      {workflow.paths.map((path) => (
        <WorkflowPathItem key={path.label} path={path} />
      ))}
    </ul>
  );
}
