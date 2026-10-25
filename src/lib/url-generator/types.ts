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
  fileParser,
  metricsParser,
  monitorsParser,
  personalityParser,
  projectParser,
  resultParser,
  resultReportParser,
  resultsParser,
  runsOverviewParser,
} from './parsers';

export interface TypedLinkProps<Parsers extends ParserMap> {
  options?: CreateSerializerOptions<Parsers>;
  values?: Partial<Nullable<inferParserType<Parsers>>>;
}

export interface ProjectScopedType {
  projectId: number;
}

export type ProjectQueryType = TypedLinkProps<typeof projectParser>;

export type AgentsType = TypedLinkProps<typeof agentsParser>;

export type MetricsType = TypedLinkProps<typeof metricsParser>;

export interface AgentType {
  agentId: number;
}

export interface MetricEditType extends ProjectQueryType {
  metricId: number;
}

export interface MetricReviewType extends ProjectQueryType {
  reviewId: number;
}

export interface LabEditType {
  metricId: number;
}

export type PersonalityType = TypedLinkProps<typeof personalityParser>;

export interface PersonalityEditType extends ProjectQueryType {
  personalityId: number;
}

export type EvaluatorsType = TypedLinkProps<typeof evaluatorsParser>;

export type EvaluatorCreateType = TypedLinkProps<typeof evaluatorCreateParser>;

export interface EvaluatorType extends ProjectQueryType {
  evaluatorId: number;
}

export type ResultsType = ProjectScopedType &
  TypedLinkProps<typeof resultsParser>;

export interface ResultType
  extends ProjectScopedType, TypedLinkProps<typeof resultParser> {
  resultId: number;
}

export type RunsOverviewType = TypedLinkProps<typeof runsOverviewParser>;

export type MonitorsType = TypedLinkProps<typeof monitorsParser>;

export type CallsType = ProjectScopedType & TypedLinkProps<typeof callsParser>;

export type AlertsType = ProjectScopedType &
  TypedLinkProps<typeof alertsParser>;

export interface DashboardType extends ProjectScopedType {
  dashboardId: number;
}

export interface FileType extends TypedLinkProps<typeof fileParser> {
  fileId: string;
}

export interface ShareFileType extends TypedLinkProps<typeof fileParser> {
  token: string;
  fileId: string;
}

export interface ResultReportType
  extends ProjectScopedType, TypedLinkProps<typeof resultReportParser> {
  resultId: number;
}

export interface ShareType {
  token: string;
}
