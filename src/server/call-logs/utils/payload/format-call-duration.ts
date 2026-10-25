const pad = (value: number) => String(value).padStart(2, '0');

export const formatCallDuration = (seconds: number | null) => {
  if (seconds === null) return '00:00';
  const total = Math.round(seconds);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
};

export const formatTranscriptTime = (seconds: number | null) => {
  const total = Math.max(0, Math.floor(seconds ?? 0));
  return `${Math.floor(total / 60)}:${pad(total % 60)}`;
};
