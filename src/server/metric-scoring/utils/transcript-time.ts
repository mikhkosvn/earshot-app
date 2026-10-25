const SECONDS_PER_MINUTE = 60;

export const transcriptTime = (seconds: number | null) => {
  if (seconds === null) return '0:00.00';
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / SECONDS_PER_MINUTE);
  const rest = (safe - minutes * SECONDS_PER_MINUTE)
    .toFixed(2)
    .padStart(5, '0');
  return `${minutes}:${rest}`;
};
