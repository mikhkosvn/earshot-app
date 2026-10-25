const CSV_CONTENT_TYPE = 'text/csv';

export const downloadCsvFile = ({
  fileName,
  content,
}: {
  fileName: string;
  content: string;
}) => {
  const url = URL.createObjectURL(
    new Blob([content], { type: CSV_CONTENT_TYPE }),
  );
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
