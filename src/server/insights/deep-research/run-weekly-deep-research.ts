import 'server-only';

import { subDays } from 'date-fns';

import { DeepResearchTrigger } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { DEEP_RESEARCH_WINDOW_DAYS } from '@/server/insights/constants/insight-limits';
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
  for (const project of projects) {
    try {
      await runDeepResearch(project.id, DeepResearchTrigger.weekly);
      reports += 1;
    } catch (error) {
      console.error(
        `[insights] The weekly Deep Research of project ${project.id} failed.`,
        error,
      );
    }
  }
  return { reports };
};
