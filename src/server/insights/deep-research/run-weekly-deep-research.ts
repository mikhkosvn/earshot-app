import 'server-only';

import { subDays } from 'date-fns';

import { DeepResearchTrigger } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { DEEP_RESEARCH_WINDOW_DAYS } from '@/server/insights/constants/insight-limits';
import { InsightStep } from '@/server/insights/constants/insight-step';
import { runDeepResearch } from '@/server/insights/deep-research/run-deep-research';

export const runWeeklyDeepResearch = async (now: Date = new Date()) => {
  const since = subDays(now, DEEP_RESEARCH_WINDOW_DAYS);
  const projects = await prisma.project.findMany({
    where: {
      deepResearchEnabled: true,
      deepResearchInsights: {
        none: {
          trigger: DeepResearchTrigger.weekly,
          createdAt: { gte: since },
        },
      },
    },
    select: { id: true },
  });
  let reports = 0;
  const failedProjectIds: number[] = [];
  for (const project of projects) {
    try {
      await runDeepResearch(project.id, DeepResearchTrigger.weekly);
      reports += 1;
    } catch (error) {
      failedProjectIds.push(project.id);
      recordStepFailure(InsightStep.weekly_deep_research, error);
    }
  }
  addEventFields({
    weekly_deep_research: {
      due_projects: projects.length,
      reports,
      failed_project_ids: failedProjectIds,
    },
  });
  return { reports };
};
