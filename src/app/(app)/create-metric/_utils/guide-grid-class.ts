const GRID_CLASS = 'grid items-start gap-3';

export const guideGridClass = (isGuideOpen: boolean) => {
  if (!isGuideOpen) return GRID_CLASS;
  return `${GRID_CLASS} lg:grid-cols-[minmax(0,1fr)_380px]`;
};
