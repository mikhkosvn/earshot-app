import 'server-only';

import { differenceInDays, subDays } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { parseTimeExpression } from '@/lib/time-range/parse-time-expression';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import {
  CallFilterField,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';
import {
  CALL_LIST_DEFAULT_DAYS,
  CALL_LIST_MAX_RANGE_DAYS,
} from '@/server/call-logs/constants/call-log-limits';
import { publicCallLogListQuerySchema } from '@/server/call-logs/schemas/observe';
import type {
  FilterCondition,
  FilterGroup,
  FilterNode,
} from '@/server/call-logs/types';
import { filterNodeWhere } from '@/server/call-logs/utils/filters/filter-where';
import {
  publicCallLogSelect,
  toPublicCallLogListItem,
} from '@/server/call-logs/utils/payload/public-call-log';
import { ActionError } from '@/server/common/run-action';
import { paginate, readPageParams } from '@/server/public-api/paginate';

const isTimestampCondition = (node: FilterNode): node is FilterCondition =>
  !('conditions' in node) && node.field === CallFilterField.timestamp;

const boundOf = (
  conditions: FilterCondition[],
  operators: FilterOperator[],
  now: Date,
) => {
  const condition = conditions.find((item) => operators.includes(item.op));
  if (!condition) return null;
  return parseTimeExpression(String(condition.value ?? ''), now);
};

const checkTimeRange = (group: FilterGroup | null, now: Date) => {
  const timestamps = (group?.conditions ?? []).filter(isTimestampCondition);
  const from = boundOf(
    timestamps,
    [FilterOperator.gt, FilterOperator.gte],
    now,
  );
  if (!from) {
    return [
      {
        field: CallFilterField.timestamp,
        op: FilterOperator.gte,
        value: subDays(now, CALL_LIST_DEFAULT_DAYS).toISOString(),
      },
    ];
  }
  const to =
    boundOf(timestamps, [FilterOperator.lt, FilterOperator.lte], now) ?? now;
  if (differenceInDays(to, from) > CALL_LIST_MAX_RANGE_DAYS) {
    throw new ActionError(
      `The time range must be ${CALL_LIST_MAX_RANGE_DAYS} days or shorter.`,
    );
  }
  return [];
};

const presentNodes = (group: FilterGroup | null): FilterNode[] => {
  if (!group) return [];
  return [group];
};

const projectIdOf = async (auth: ApiKeyAuth, projectId: number | undefined) => {
  if (auth.projectId) return auth.projectId;
  if (!projectId) throw new ActionError('Send the project_id parameter.');
  const project = await prisma.project.findFirst({
    where: { id: projectId, organizationId: auth.organizationId },
    select: { id: true },
  });
  if (!project) throw new ActionError('The project does not exist.', 404);
  return project.id;
};

export const listPublicCallLogs = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const searchParams = Object.fromEntries(new URL(request.url).searchParams);
  const query = publicCallLogListQuerySchema.parse(searchParams);
  const projectId = await projectIdOf(auth, query.project_id);
  const now = new Date();
  const nodes: FilterNode[] = [
    ...checkTimeRange(query.filters_v2, now),
    ...presentNodes(query.filters_v2),
  ];
  const where: Prisma.CallLogWhereInput = {
    AND: [
      { projectId },
      { ...(query.agent && { agentId: query.agent }) },
      ...nodes.map((node) => filterNodeWhere(node, now)),
    ],
  };
  const { page, pageSize, skip, take } = readPageParams(request);
  const [count, rows] = await prisma.$transaction([
    prisma.callLog.count({ where }),
    prisma.callLog.findMany({
      where,
      orderBy: [
        { createdAt: Prisma.SortOrder.desc },
        { id: Prisma.SortOrder.desc },
      ],
      skip,
      take,
      select: publicCallLogSelect,
    }),
  ]);
  return paginate({
    page,
    pageSize,
    count,
    results: rows.map(toPublicCallLogListItem),
    request,
  });
};
