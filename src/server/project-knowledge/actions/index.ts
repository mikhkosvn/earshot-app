'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getProjectKnowledge } from '@/server/project-knowledge/get-project-knowledge';
import { listProjectKnowledgeVersions } from '@/server/project-knowledge/list-project-knowledge-versions';
import { saveProjectKnowledge } from '@/server/project-knowledge/save-project-knowledge';
import type {
  ProjectKnowledge,
  ProjectKnowledgeIdInput,
  ProjectKnowledgeVersionRow,
  SaveProjectKnowledgeInput,
} from '@/server/project-knowledge/types';
import { ProjectKnowledgeActionOperation } from '@/server/project-knowledge/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getProjectKnowledgeAction(
  args: ProjectKnowledgeIdInput,
): Promise<ProjectKnowledge> {
  return withActionEvent(
    ProjectKnowledgeActionOperation.getProjectKnowledge,
    () => getProjectKnowledge(args),
  );
}

export async function listProjectKnowledgeVersionsAction(
  args: ProjectKnowledgeIdInput,
): Promise<ProjectKnowledgeVersionRow[]> {
  return withActionEvent(
    ProjectKnowledgeActionOperation.listProjectKnowledgeVersions,
    () => listProjectKnowledgeVersions(args),
  );
}

export async function saveProjectKnowledgeAction(
  args: SaveProjectKnowledgeInput,
): Promise<ActionResult<{ id: number; version: number }>> {
  return withActionEvent(
    ProjectKnowledgeActionOperation.saveProjectKnowledge,
    () => runAction(() => saveProjectKnowledge(args)),
  );
}
