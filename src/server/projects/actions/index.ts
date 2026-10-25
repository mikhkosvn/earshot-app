'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createProject } from '@/server/projects/create-project';
import { deleteProject } from '@/server/projects/delete-project';
import { getCurrentProjectId } from '@/server/projects/get-current-project-id';
import { getProject } from '@/server/projects/get-project';
import { listProjects } from '@/server/projects/list-projects';
import { switchProject } from '@/server/projects/switch-project';
import type {
  CreateProjectInput,
  DeleteProjectResult,
  ListProjectsInput,
  ProjectDetail,
  ProjectIdInput,
  ProjectSummary,
  UpdateProjectInput,
} from '@/server/projects/types';
import { updateProject } from '@/server/projects/update-project';

export async function getCurrentProjectIdAction(): Promise<number> {
  return getCurrentProjectId();
}

export async function getProjectAction(
  args: ProjectIdInput,
): Promise<ProjectDetail> {
  return getProject(args);
}

export async function listProjectsAction(
  args: ListProjectsInput,
): Promise<ProjectSummary[]> {
  return listProjects(args);
}

export async function createProjectAction(
  args: CreateProjectInput,
): Promise<ActionResult<ProjectSummary>> {
  return runAction(() => createProject(args));
}

export async function updateProjectAction(
  args: UpdateProjectInput,
): Promise<ActionResult<ProjectSummary>> {
  return runAction(() => updateProject(args));
}

export async function deleteProjectAction(
  args: ProjectIdInput,
): Promise<ActionResult<DeleteProjectResult>> {
  return runAction(() => deleteProject(args));
}

export async function switchProjectAction(
  args: ProjectIdInput,
): Promise<ActionResult<{ projectId: number }>> {
  return runAction(() => switchProject(args));
}
