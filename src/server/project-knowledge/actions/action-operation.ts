export const ProjectKnowledgeActionOperation = {
  getProjectKnowledge: 'project_knowledge.get_project_knowledge',
  listProjectKnowledgeVersions:
    'project_knowledge.list_project_knowledge_versions',
  saveProjectKnowledge: 'project_knowledge.save_project_knowledge',
} as const;

export type ProjectKnowledgeActionOperation =
  (typeof ProjectKnowledgeActionOperation)[keyof typeof ProjectKnowledgeActionOperation];
