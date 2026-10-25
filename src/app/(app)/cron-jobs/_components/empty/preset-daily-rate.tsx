type PresetDailyRateProps = {
  dailyRate: string | null;
};

export function PresetDailyRate({ dailyRate }: PresetDailyRateProps) {
  if (!dailyRate) return null;

  return <> · {dailyRate}</>;
}
