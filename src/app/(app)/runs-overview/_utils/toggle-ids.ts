export type IdListKey =
  'tagIds' | 'personalityIds' | 'evaluatorIds' | 'folderIds' | 'monitorIds';

export const toggledId = (
  ids: readonly number[],
  id: number,
  checked: boolean,
) => {
  const rest = ids.filter((item) => item !== id);
  if (checked) return [...rest, id];
  return rest;
};

export const toggledIds = (
  ids: readonly number[],
  targets: readonly number[],
  checked: boolean,
) => {
  const rest = ids.filter((id) => !targets.includes(id));
  if (checked) return [...rest, ...targets];
  return rest;
};
