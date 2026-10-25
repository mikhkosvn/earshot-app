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

export async function getProjectKnowledgeAction(
  args: ProjectKnowledgeIdInput,
): Promise<ProjectKnowledge> {
  return getProjectKnowledge(args);
}

export async function listProjectKnowledgeVersionsAction(
  args: ProjectKnowledgeIdInput,
): Promise<ProjectKnowledgeVersionRow[]> {
  return listProjectKnowledgeVersions(args);
}

export async function saveProjectKnowledgeAction(
  args: SaveProjectKnowledgeInput,
): Promise<ActionResult<{ id: number; version: number }>> {
  return runAction(() => saveProjectKnowledge(args));
}
