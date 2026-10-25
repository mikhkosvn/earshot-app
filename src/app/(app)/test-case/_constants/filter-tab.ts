export const FilterTab = {
  tags: 'tags',
  personality: 'personality',
  agents: 'agents',
  metrics: 'metrics',
} as const;

export type FilterTab = (typeof FilterTab)[keyof typeof FilterTab];

export const FilterTabLabel: Record<FilterTab, string> = {
  [FilterTab.tags]: 'Tags',
  [FilterTab.personality]: 'Personality',
  [FilterTab.agents]: 'Agents',
  [FilterTab.metrics]: 'Metrics',
};
