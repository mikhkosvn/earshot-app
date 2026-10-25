export const toggleItem = <T>(
  items: readonly T[],
  item: T,
  checked: boolean,
) => {
  const rest = items.filter((value) => value !== item);
  if (!checked) return rest;
  return [...rest, item];
};
