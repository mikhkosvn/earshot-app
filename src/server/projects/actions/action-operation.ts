export const ProjectsActionOperation = {
  getCurrentProjectId: 'projects.get_current_project_id',
  getProject: 'projects.get_project',
  listProjects: 'projects.list_projects',
  createProject: 'projects.create_project',
  updateProject: 'projects.update_project',
  deleteProject: 'projects.delete_project',
  switchProject: 'projects.switch_project',
} as const;

export type ProjectsActionOperation =
  (typeof ProjectsActionOperation)[keyof typeof ProjectsActionOperation];
