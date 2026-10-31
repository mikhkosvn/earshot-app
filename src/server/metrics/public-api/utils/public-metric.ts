import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { PublicAlertType } from '@/server/metrics/public-api/constants';
import {
  metricDetailSelect,
  toMetricDetail,
} from '@/server/metrics/utils/metric-view';

export const publicMetricSelect = {
  ...metricDetailSelect,
  displayOrder: true,
  observabilityEnabled: true,
  simulationEnabled: true,
  samplingEnabled: true,
} satisfies Prisma.MetricSelect;

export type PublicMetricRow = Prisma.MetricGetPayload<{
  select: typeof publicMetricSelect;
}>;

const agentIdsOf = (linkedAgentIds: number[], projectAgentIds: number[]) => {
  if (linkedAgentIds.length === 0) return projectAgentIds;
  return linkedAgentIds;
};

export const toPublicMetric = (
  row: PublicMetricRow,
  projectAgentIds: number[],
) => {
  const detail = toMetricDetail(row);
  return {
    id: detail.id,
    project: detail.projectId,
    name: detail.name,
    slug: detail.slug,
    description: detail.description,
    type: detail.type,
    eval_type: detail.evalType,
    enum_values: detail.enumValues,
    audio_enabled: detail.audioEnabled,
    prompt: '',
    evaluation_trigger: detail.evaluationTrigger,
    trigger_type: detail.triggerType,
    evaluation_trigger_prompt: detail.evaluationTriggerPrompt,
    evaluation_trigger_custom_code: detail.evaluationTriggerCustomCode,
    priority_assignment_prompt: '',
    configuration: detail.configuration ?? {},
    display_order: row.displayOrder,
    observability_enabled: row.observabilityEnabled,
    simulation_enabled: row.simulationEnabled,
    sampling_enabled: row.samplingEnabled,
    alert_enabled: false,
    alert_type: PublicAlertType.disabled,
    add_to_new_agents: detail.addToNewAgents,
    vocera_defined_metric_code: detail.code,
    user_defined: detail.userDefined,
    function_name: detail.functionName,
    custom_code: row.customCode,
    agents: agentIdsOf(detail.agentIds, projectAgentIds),
    created_at: detail.createdAt,
    updated_at: detail.updatedAt,
  };
};
