import type { EvaluatorFile } from '@/server/evaluators/types';

export const downloadTextFile = ({
  fileName,
  mimeType,
  content,
}: EvaluatorFile) => {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
