import 'server-only';

import { z } from 'zod';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { generateObject } from '@/server/ai/generate-object';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';
import {
  type ImprovementSource,
  improvementProposalsMock,
} from '@/server/evaluators/ai/mocks/improvement-proposals-mock';
import { proposeEvaluatorImprovementsSchema } from '@/server/evaluators/schemas/evaluator-ai';
import type {
  EvaluatorImprovementProposal,
  EvaluatorImprovementReply,
} from '@/server/evaluators/types';
import { evaluatorFilterWhere } from '@/server/evaluators/utils/evaluator-filter-where';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const SYSTEM_PROMPT =
  'You improve test scenarios ("evaluators") for voice agents. Each evaluator has caller instructions and an expected outcome. Follow the request of the user. Propose at most one change for each evaluator, as the full new text of either the instructions or the expected outcome. Keep every {{test_profile.*}} variable. Explain each change in one short sentence.';

const proposalSchema = z.object({
  message: z.string(),
  proposals: z.array(
    z.object({
      evaluatorId: z.number().int(),
      kind: z.enum(EvaluatorTextKind),
      after: z.string(),
      reason: z.string(),
    }),
  ),
});

const beforeText = (source: ImprovementSource, kind: EvaluatorTextKind) => {
  if (kind === EvaluatorTextKind.expectedOutcome) {
    return source.expectedOutcomePrompt;
  }
  return source.instructions;
};

const describeSources = (sources: ImprovementSource[]) =>
  sources
    .map(
      (source) =>
        `Evaluator ${source.id}: ${source.name}\nInstructions:\n${source.instructions}\nExpected outcome:\n${source.expectedOutcomePrompt}`,
    )
    .join('\n\n');

export const proposeEvaluatorImprovements = withValidation(
  proposeEvaluatorImprovementsSchema,
  async ({ filter, limit, prompt }): Promise<EvaluatorImprovementReply> => {
    await requireProjectAccess(filter.projectId);
    const rows = await prisma.evaluator.findMany({
      where: evaluatorFilterWhere(filter),
      select: {
        id: true,
        name: true,
        instructions: true,
        expectedOutcomePrompt: true,
      },
      orderBy: { id: Prisma.SortOrder.desc },
      take: limit,
    });
    const sources: ImprovementSource[] = rows.map((row) => ({
      ...row,
      expectedOutcomePrompt: row.expectedOutcomePrompt ?? '',
    }));
    addEventFields({
      project: { id: filter.projectId },
      evaluators: { count: sources.length, limit },
    });
    if (sources.length === 0) {
      return {
        message: 'No evaluators match the current filters.',
        evaluatorCount: 0,
        proposals: [],
      };
    }
    const result = await generateObject({
      system: SYSTEM_PROMPT,
      prompt: `Request: ${prompt}\n\n${describeSources(sources)}`,
      schema: proposalSchema,
      mock: () => improvementProposalsMock(prompt, sources),
    });
    const byId = new Map(sources.map((source) => [source.id, source]));
    const proposals = result.proposals.flatMap(
      (proposal): EvaluatorImprovementProposal[] => {
        const source = byId.get(proposal.evaluatorId);
        if (!source) return [];
        const before = beforeText(source, proposal.kind);
        if (before.trim() === proposal.after.trim()) return [];
        return [
          {
            evaluatorId: source.id,
            evaluatorName: source.name,
            kind: proposal.kind,
            before,
            after: proposal.after,
            reason: proposal.reason,
          },
        ];
      },
    );
    addEventFields({
      evaluator_improvements: {
        proposed_count: result.proposals.length,
        kept_count: proposals.length,
      },
    });
    return {
      message: result.message,
      evaluatorCount: sources.length,
      proposals,
    };
  },
);
