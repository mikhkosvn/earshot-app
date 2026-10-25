import type { Route } from 'next';

import {
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
import { createTypedLink } from './typed-links';
import type {
  AgentsType,
  AgentType,
  AlertsType,
  CallsType,
  DashboardType,
  EvaluatorCreateType,
  EvaluatorsType,
  EvaluatorType,
  FileType,
  LabEditType,
  MetricEditType,
  MetricReviewType,
  MetricsType,
  MonitorsType,
  PersonalityEditType,
  PersonalityType,
  ProjectQueryType,
  ProjectScopedType,
  ResultsType,
  ResultType,
  RunsOverviewType,
  ShareType,
} from './types';

export class UrlGenerator {
  static rootUrl() {
    return '/' as Route;
  }

  static login() {
    return '/login' as Route;
  }

  static signup() {
    return '/signup' as Route;
  }

  static agents({ options, values }: AgentsType = {}) {
    return createTypedLink('/agents' as Route, agentsParser, options)(values);
  }

  static agentNew({ options, values }: ProjectQueryType = {}) {
    return createTypedLink(
      '/agents/new' as Route,
      projectParser,
      options,
    )(values);
  }

  static agent({ agentId }: AgentType) {
    return `/agents/${agentId}` as Route;
  }

  static metrics({ options, values }: MetricsType = {}) {
    return createTypedLink('/metrics' as Route, metricsParser, options)(values);
  }

  static metricEdit({ metricId, options, values }: MetricEditType) {
    return createTypedLink(
      `/metrics/edit/${metricId}` as Route,
      projectParser,
      options,
    )(values);
  }

  static createMetric({ options, values }: ProjectQueryType = {}) {
    return createTypedLink(
      '/create-metric' as Route,
      projectParser,
      options,
    )(values);
  }

  static metricReview({ reviewId, options, values }: MetricReviewType) {
    return createTypedLink(
      `/create-metric/review/${reviewId}` as Route,
      projectParser,
      options,
    )(values);
  }

  static labs({ options, values }: ProjectQueryType = {}) {
    return createTypedLink('/labs' as Route, projectParser, options)(values);
  }

  static labEdit({ metricId }: LabEditType) {
    return `/labs/edit/${metricId}` as Route;
  }

  static rubric({ options, values }: ProjectQueryType = {}) {
    return createTypedLink('/rubric' as Route, projectParser, options)(values);
  }

  static personality({ options, values }: PersonalityType = {}) {
    return createTypedLink(
      '/personality' as Route,
      personalityParser,
      options,
    )(values);
  }

  static personalityCreate({ options, values }: ProjectQueryType = {}) {
    return createTypedLink(
      '/personality/create' as Route,
      projectParser,
      options,
    )(values);
  }

  static personalityEdit({
    personalityId,
    options,
    values,
  }: PersonalityEditType) {
    return createTypedLink(
      `/personality/edit/${personalityId}` as Route,
      projectParser,
      options,
    )(values);
  }

  static evaluators({ options, values }: EvaluatorsType = {}) {
    return createTypedLink(
      '/test-case' as Route,
      evaluatorsParser,
      options,
    )(values);
  }

  static evaluatorCreate({ options, values }: EvaluatorCreateType = {}) {
    return createTypedLink(
      '/test-case/create' as Route,
      evaluatorCreateParser,
      options,
    )(values);
  }

  static evaluator({ evaluatorId, options, values }: EvaluatorType) {
    return createTypedLink(
      `/test-case/${evaluatorId}` as Route,
      projectParser,
      options,
    )(values);
  }

  static results({ projectId, options, values }: ResultsType) {
    return createTypedLink(
      `/${projectId}/results` as Route,
      resultsParser,
      options,
    )(values);
  }

  static result({ projectId, resultId, options, values }: ResultType) {
    return createTypedLink(
      `/${projectId}/results/${resultId}` as Route,
      resultParser,
      options,
    )(values);
  }

  static runsOverview({ options, values }: RunsOverviewType = {}) {
    return createTypedLink(
      '/runs-overview' as Route,
      runsOverviewParser,
      options,
    )(values);
  }

  static monitors({ options, values }: MonitorsType = {}) {
    return createTypedLink(
      '/cron-jobs' as Route,
      monitorsParser,
      options,
    )(values);
  }

  static calls({ projectId, options, values }: CallsType) {
    return createTypedLink(
      `/${projectId}/calls` as Route,
      callsParser,
      options,
    )(values);
  }

  static alerts({ projectId, options, values }: AlertsType) {
    return createTypedLink(
      `/${projectId}/alerts/review` as Route,
      alertsParser,
      options,
    )(values);
  }

  static insights({ projectId }: ProjectScopedType) {
    return `/${projectId}/insights` as Route;
  }

  static dashboards({ projectId }: ProjectScopedType) {
    return `/${projectId}/dashboards` as Route;
  }

  static dashboard({ projectId, dashboardId }: DashboardType) {
    return `/${projectId}/dashboards/${dashboardId}` as Route;
  }

  static settings() {
    return '/settings' as Route;
  }

  static settingsOrg() {
    return '/settings/org' as Route;
  }

  static settingsProject() {
    return '/settings/project' as Route;
  }

  static settingsAbout() {
    return '/settings/about' as Route;
  }

  static settingsOrgGeneral() {
    return '/settings/org/general' as Route;
  }

  static settingsOrgApiKey() {
    return '/settings/org/api-key' as Route;
  }

  static settingsOrgMembers() {
    return '/settings/org/members' as Route;
  }

  static settingsOrgTelephony() {
    return '/settings/org/telephony' as Route;
  }

  static settingsProjectGeneral() {
    return '/settings/project/general' as Route;
  }

  static settingsProjectIntegrations() {
    return '/settings/project/integrations' as Route;
  }

  static settingsProjectProviderApiKeys() {
    return '/settings/project/provider-api-keys' as Route;
  }

  static settingsProjectWebhook() {
    return '/settings/project/webhook' as Route;
  }

  static settingsProjectAgentKnowledge() {
    return '/settings/project/agent-knowledge' as Route;
  }

  static settingsAboutThirdPartyNotices() {
    return '/settings/about/third-party-notices' as Route;
  }

  static file({ fileId }: FileType) {
    return `/api/files/${fileId}` as Route;
  }

  static share({ token }: ShareType) {
    return `/share/${token}` as Route;
  }
}
