export const insertAtCursor = (
  elementId: string,
  current: string,
  token: string,
) => {
  const element = document.getElementById(elementId);
  if (!(element instanceof HTMLTextAreaElement)) return `${current}${token}`;
  const start = element.selectionStart;
  const end = element.selectionEnd;
  return `${current.slice(0, start)}${token}${current.slice(end)}`;
};
