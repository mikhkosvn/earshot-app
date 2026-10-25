import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/projects/schemas';
import type { ProjectDetail } from '@/server/projects/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getProject = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<ProjectDetail> => {
    const { project, role } = await requireProjectAccess(projectId);
    return {
      id: project.id,
      name: project.name,
      organizationId: project.organizationId,
      timezone: project.timezone,
      outboundTimeout: project.outboundTimeout,
      maxCallDuration: project.maxCallDuration,
      minCallDuration: project.minCallDuration,
      sampleRate: project.sampleRate,
      endCallEnabled: project.endCallEnabled,
      useProviderTranscript: project.useProviderTranscript,
      reconcileProviderTranscripts: project.reconcileProviderTranscripts,
      deepResearchEnabled: project.deepResearchEnabled,
      notifyDailyReport: project.notifyDailyReport,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      organization: project.organization,
      role,
    };
  },
);
