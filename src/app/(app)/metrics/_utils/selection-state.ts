export const selectionState = (selectedCount: number, totalCount: number) => {
  if (totalCount === 0 || selectedCount === 0) {
    return { checked: false, indeterminate: false };
  }
  if (selectedCount >= totalCount) {
    return { checked: true, indeterminate: false };
  }
  return { checked: false, indeterminate: true };
};
