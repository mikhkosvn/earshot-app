const TICK_STEPS = [5, 10, 30, 60, 120, 300, 600];
const TICK_TARGET = 6;

export const timeTicks = (duration: number) => {
  if (duration <= 0) return [0];
  const step =
    TICK_STEPS.find((value) => duration / value <= TICK_TARGET) ?? 1200;
  const count = Math.floor(duration / step);
  return Array.from({ length: count + 1 }, (_, index) => index * step);
};
