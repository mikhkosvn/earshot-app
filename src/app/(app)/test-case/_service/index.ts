import { queryOptions } from '@tanstack/react-query';

import { JobKind, JobStatus } from '@/generated/prisma/enums';
import { deferAction } from '@/lib/query-client/defer-action';
import {
  getGenerationSessionAction,
  listGenerationSessionsAction,
} from '@/server/evaluator-generation/actions';
import type { GenerationSessionView } from '@/server/evaluator-generation/types';
import {
  getAgentEvaluatorDefaultsAction,
  getEvaluatorAction,
  listAgentOptionsAction,
  listEvaluatorsAction,
  listEvaluatorVersionsAction,
  listMetricOptionsAction,
  listPersonalityOptionsAction,
  listPhoneNumberOptionsAction,
  listProjectOptionsAction,
} from '@/server/evaluators/actions';
import type { ListEvaluatorsInput } from '@/server/evaluators/types';
import { listFoldersAction } from '@/server/folders/actions';
import { JOB_POLL_INTERVAL_MS } from '@/server/jobs/constants';
import { listRecentJobsAction } from '@/server/jobs/actions';
import type { JobView } from '@/server/jobs/types';
import { listTagsAction } from '@/server/tags/actions';
import { listTestProfilesAction } from '@/server/test-profiles/actions';

export const EvaluatorKey = {
  list: 'evaluator-list',
  detail: 'evaluator-detail',
  versions: 'evaluator-versions',
  folders: 'evaluator-folders',
  tags: 'evaluator-tags',
  testProfiles: 'test-profiles',
  agents: 'evaluator-agent-options',
  personalities: 'evaluator-personality-options',
  metrics: 'evaluator-metric-options',
  phoneNumbers: 'evaluator-phone-number-options',
  projects: 'evaluator-project-options',
  agentDefaults: 'evaluator-agent-defaults',
  generationSession: 'evaluator-generation-session',
  generationSessions: 'evaluator-generation-sessions',
  generationJobs: 'evaluator-generation-jobs',
  createFolder: 'create-folder',
  renameFolder: 'rename-folder',
  deleteFolder: 'delete-folder',
  duplicateFolder: 'duplicate-folder',
  createEvaluator: 'create-evaluator',
  updateEvaluator: 'update-evaluator',
  restoreVersion: 'restore-evaluator-version',
  deleteEvaluators: 'delete-evaluators',
  addTags: 'add-evaluator-tags',
  moveEvaluators: 'move-evaluators',
  duplicateEvaluators: 'duplicate-evaluators',
  modifyEvaluators: 'modify-evaluators',
  exportEvaluators: 'export-evaluators',
  improveText: 'improve-evaluator-text',
  proposeImprovements: 'propose-evaluator-improvements',
  applyImprovements: 'apply-evaluator-improvements',
  createFromTranscript: 'create-evaluator-from-transcript',
  startAssistant: 'start-evaluator-assistant',
  answerAssistant: 'answer-evaluator-assistant',
  saveTestProfile: 'save-test-profile',
  duplicateTestProfile: 'duplicate-test-profile',
  deleteTestProfile: 'delete-test-profile',
} as const;

export type EvaluatorKey = (typeof EvaluatorKey)[keyof typeof EvaluatorKey];

const GENERATION_JOB_KINDS = [
  JobKind.evaluator_assistant,
  JobKind.evaluator_generation,
];

const isActiveJob = (status: JobStatus) =>
  status === JobStatus.queued || status === JobStatus.running;

const sessionInterval = (session: GenerationSessionView | undefined) => {
  if (!session) return false;
  const jobs = [session.assistantJob, session.generationJob];
  if (jobs.some((job) => job && isActiveJob(job.status))) {
    return JOB_POLL_INTERVAL_MS;
  }
  return false;
};

const generationJobsInterval = (jobs: JobView[] | undefined) => {
  if (jobs?.some((job) => isActiveJob(job.status))) return JOB_POLL_INTERVAL_MS;
  return false;
};

type ProjectArgs = { projectId: number };

export class EvaluatorService {
  static readonly listKey = [EvaluatorKey.list];
  static readonly foldersKey = [EvaluatorKey.folders];
  static readonly tagsKey = [EvaluatorKey.tags];
  static readonly testProfilesKey = [EvaluatorKey.testProfiles];
  static readonly generationJobsKey = [EvaluatorKey.generationJobs];
  static readonly generationSessionsKey = [EvaluatorKey.generationSessions];
  static readonly createFolderMutationKey = [EvaluatorKey.createFolder];
  static readonly renameFolderMutationKey = [EvaluatorKey.renameFolder];
  static readonly deleteFolderMutationKey = [EvaluatorKey.deleteFolder];
  static readonly duplicateFolderMutationKey = [EvaluatorKey.duplicateFolder];
  static readonly createEvaluatorMutationKey = [EvaluatorKey.createEvaluator];
  static readonly updateEvaluatorMutationKey = [EvaluatorKey.updateEvaluator];
  static readonly restoreVersionMutationKey = [EvaluatorKey.restoreVersion];
  static readonly deleteEvaluatorsMutationKey = [EvaluatorKey.deleteEvaluators];
  static readonly addTagsMutationKey = [EvaluatorKey.addTags];
  static readonly moveEvaluatorsMutationKey = [EvaluatorKey.moveEvaluators];
  static readonly duplicateEvaluatorsMutationKey = [
    EvaluatorKey.duplicateEvaluators,
  ];
  static readonly modifyEvaluatorsMutationKey = [EvaluatorKey.modifyEvaluators];
  static readonly exportEvaluatorsMutationKey = [EvaluatorKey.exportEvaluators];
  static readonly improveTextMutationKey = [EvaluatorKey.improveText];
  static readonly proposeImprovementsMutationKey = [
    EvaluatorKey.proposeImprovements,
  ];
  static readonly applyImprovementsMutationKey = [
    EvaluatorKey.applyImprovements,
  ];
  static readonly createFromTranscriptMutationKey = [
    EvaluatorKey.createFromTranscript,
  ];
  static readonly startAssistantMutationKey = [EvaluatorKey.startAssistant];
  static readonly answerAssistantMutationKey = [EvaluatorKey.answerAssistant];
  static readonly saveTestProfileMutationKey = [EvaluatorKey.saveTestProfile];
  static readonly duplicateTestProfileMutationKey = [
    EvaluatorKey.duplicateTestProfile,
  ];
  static readonly deleteTestProfileMutationKey = [
    EvaluatorKey.deleteTestProfile,
  ];

  static getListQuery(input: ListEvaluatorsInput) {
    return queryOptions({
      queryKey: [EvaluatorKey.list, input],
      queryFn: () => deferAction(() => listEvaluatorsAction(input)),
    });
  }

  static getEvaluatorQuery(args: { evaluatorId: number }) {
    return queryOptions({
      queryKey: [EvaluatorKey.detail, args],
      queryFn: () => deferAction(() => getEvaluatorAction(args)),
    });
  }

  static getVersionsQuery(args: { evaluatorId: number }) {
    return queryOptions({
      queryKey: [EvaluatorKey.versions, args],
      queryFn: () => deferAction(() => listEvaluatorVersionsAction(args)),
    });
  }

  static getFoldersQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.folders, args],
      queryFn: () => deferAction(() => listFoldersAction(args)),
    });
  }

  static getTagsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.tags, args],
      queryFn: () => deferAction(() => listTagsAction(args)),
    });
  }

  static getTestProfilesQuery(args: {
    projectId: number;
    agentId: number | null;
  }) {
    return queryOptions({
      queryKey: [EvaluatorKey.testProfiles, args],
      queryFn: () => deferAction(() => listTestProfilesAction(args)),
    });
  }

  static getAgentsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.agents, args],
      queryFn: () => deferAction(() => listAgentOptionsAction(args)),
    });
  }

  static getPersonalitiesQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.personalities, args],
      queryFn: () => deferAction(() => listPersonalityOptionsAction(args)),
    });
  }

  static getMetricsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.metrics, args],
      queryFn: () => deferAction(() => listMetricOptionsAction(args)),
    });
  }

  static getPhoneNumbersQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.phoneNumbers, args],
      queryFn: () => deferAction(() => listPhoneNumberOptionsAction(args)),
    });
  }

  static getProjectsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.projects, args],
      queryFn: () => deferAction(() => listProjectOptionsAction(args)),
    });
  }

  static getAgentDefaultsQuery(args: { projectId: number; agentId: number }) {
    return queryOptions({
      queryKey: [EvaluatorKey.agentDefaults, args],
      queryFn: () => deferAction(() => getAgentEvaluatorDefaultsAction(args)),
    });
  }

  static getGenerationSessionQuery(args: { sessionId: number }) {
    return queryOptions({
      queryKey: [EvaluatorKey.generationSession, args],
      queryFn: () => deferAction(() => getGenerationSessionAction(args)),
      staleTime: 0,
      refetchInterval: (query) => sessionInterval(query.state.data),
    });
  }

  static getGenerationSessionsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.generationSessions, args],
      queryFn: () => deferAction(() => listGenerationSessionsAction(args)),
      staleTime: 0,
    });
  }

  static getGenerationJobsQuery(args: ProjectArgs) {
    return queryOptions({
      queryKey: [EvaluatorKey.generationJobs, args],
      queryFn: () =>
        deferAction(() =>
          listRecentJobsAction({ ...args, kinds: GENERATION_JOB_KINDS }),
        ),
      staleTime: 0,
      refetchInterval: (query) => generationJobsInterval(query.state.data),
    });
  }
}
