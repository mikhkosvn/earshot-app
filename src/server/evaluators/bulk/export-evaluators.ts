import 'server-only';

import { format } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import {
  EvaluatorExportFormat,
  EvaluatorExportMimeType,
} from '@/server/evaluators/constants/evaluator-export';
import { exportEvaluatorsSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import type { EvaluatorFile } from '@/server/evaluators/types';
import {
  exportSourceSelect,
  type ExportSource,
  toEvaluatorCsv,
  toTestSuiteSpec,
} from '@/server/evaluators/utils/evaluator-export-content';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const exportContent = (
  exportFormat: EvaluatorExportFormat,
  sources: ExportSource[],
) => {
  if (exportFormat === EvaluatorExportFormat.json) {
    return toTestSuiteSpec(sources);
  }
  return toEvaluatorCsv(sources);
};

export const exportEvaluators = withValidation(
  exportEvaluatorsSchema,
  async ({ projectId, evaluatorIds, format: exportFormat }) => {
    await requireProjectAccess(projectId);
    const sources = await prisma.evaluator.findMany({
      where: { projectId, id: { in: evaluatorIds } },
      select: exportSourceSelect,
      orderBy: { id: Prisma.SortOrder.asc },
    });
    addEventFields({
      project: { id: projectId },
      evaluators: {
        requested_count: evaluatorIds.length,
        count: sources.length,
      },
      export: { format: exportFormat },
    });
    const file: EvaluatorFile = {
      fileName: `scenarios-export-${format(new Date(), 'yyyy-MM-dd')}.${exportFormat}`,
      mimeType: EvaluatorExportMimeType[exportFormat],
      content: exportContent(exportFormat, sources),
    };
    return file;
  },
);
