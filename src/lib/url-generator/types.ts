import type {
  CreateSerializerOptions,
  inferParserType,
  Nullable,
  ParserMap,
} from 'nuqs/server';

import type {
  agentsParser,
  alertsParser,
  callsParser,
  evaluatorCreateParser,
  evaluatorsParser,
  metricsParser,
  monitorsParser,
  personalityParser,
  projectParser,
  resultParser,
  resultsParser,
  runsOverviewParser,
} from './parsers';

export type TypedLinkProps<Parsers extends ParserMap> = {
  options?: CreateSerializerOptions<Parsers>;
  values?: Partial<Nullable<inferParserType<Parsers>>>;
};

export type ProjectScopedType = {
  projectId: number;
};

export type ProjectQueryType = TypedLinkProps<typeof projectParser>;

export type AgentsType = TypedLinkProps<typeof agentsParser>;

export type MetricsType = TypedLinkProps<typeof metricsParser>;

export type AgentType = {
  agentId: number;
};

export type MetricEditType = {
  metricId: number;
} & ProjectQueryType;

export type MetricReviewType = {
  reviewId: number;
} & ProjectQueryType;

export type LabEditType = {
  metricId: number;
};

export type PersonalityType = TypedLinkProps<typeof personalityParser>;

export type PersonalityEditType = {
  personalityId: number;
} & ProjectQueryType;

export type EvaluatorsType = TypedLinkProps<typeof evaluatorsParser>;

export type EvaluatorCreateType = TypedLinkProps<typeof evaluatorCreateParser>;

export type EvaluatorType = {
  evaluatorId: number;
} & ProjectQueryType;

export type ResultsType = ProjectScopedType &
  TypedLinkProps<typeof resultsParser>;

export type ResultType = ProjectScopedType & {
  resultId: number;
} & TypedLinkProps<typeof resultParser>;

export type RunsOverviewType = TypedLinkProps<typeof runsOverviewParser>;

export type MonitorsType = TypedLinkProps<typeof monitorsParser>;

export type CallsType = ProjectScopedType & TypedLinkProps<typeof callsParser>;

export type AlertsType = ProjectScopedType &
  TypedLinkProps<typeof alertsParser>;

export type DashboardType = ProjectScopedType & {
  dashboardId: number;
};

export type FileType = {
  fileId: string;
};

export type ShareType = {
  token: string;
};
