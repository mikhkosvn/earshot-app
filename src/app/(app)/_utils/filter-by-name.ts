export const filterByName = <Item extends { name: string }>(
  items: Item[],
  query: string,
) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return items;
  return items.filter((item) => item.name.toLowerCase().includes(needle));
};
