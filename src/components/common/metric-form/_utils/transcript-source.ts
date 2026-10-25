export const transcriptSourceLabel = (useProviderTranscript: boolean) => {
  if (useProviderTranscript) return 'provider transcript';
  return 'Earshot transcript';
};
