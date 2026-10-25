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
import { ProjectsActionOperation } from '@/server/projects/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getCurrentProjectIdAction(): Promise<number> {
  return withActionEvent(ProjectsActionOperation.getCurrentProjectId, () =>
    getCurrentProjectId(),
  );
}

export async function getProjectAction(
  args: ProjectIdInput,
): Promise<ProjectDetail> {
  return withActionEvent(ProjectsActionOperation.getProject, () =>
    getProject(args),
  );
}

export async function listProjectsAction(
  args: ListProjectsInput,
): Promise<ProjectSummary[]> {
  return withActionEvent(ProjectsActionOperation.listProjects, () =>
    listProjects(args),
  );
}

export async function createProjectAction(
  args: CreateProjectInput,
): Promise<ActionResult<ProjectSummary>> {
  return withActionEvent(ProjectsActionOperation.createProject, () =>
    runAction(() => createProject(args)),
  );
}

export async function updateProjectAction(
  args: UpdateProjectInput,
): Promise<ActionResult<ProjectSummary>> {
  return withActionEvent(ProjectsActionOperation.updateProject, () =>
    runAction(() => updateProject(args)),
  );
}

export async function deleteProjectAction(
  args: ProjectIdInput,
): Promise<ActionResult<DeleteProjectResult>> {
  return withActionEvent(ProjectsActionOperation.deleteProject, () =>
    runAction(() => deleteProject(args)),
  );
}

export async function switchProjectAction(
  args: ProjectIdInput,
): Promise<ActionResult<{ projectId: number }>> {
  return withActionEvent(ProjectsActionOperation.switchProject, () =>
    runAction(() => switchProject(args)),
  );
}
