'use client';

import { useResultDetail } from '../../../_hooks/use-result-detail';

export function ReportAgentLine() {
  const { agent } = useResultDetail();
  if (!agent) return null;

  return (
    <p className="text-sm text-muted-foreground">
      Agent: {agent.name} {agent.versionLabel}
    </p>
  );
}
