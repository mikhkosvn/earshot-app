import { formatClock } from '../../_utils/format-time';
import { progressPercent } from '../../_utils/playback';
import { timeTicks } from '../../_utils/time-ticks';

interface WaveformTimeAxisProps {
  duration: number;
}

export function WaveformTimeAxis({ duration }: WaveformTimeAxisProps) {
  return (
    <div className="relative h-4 text-[10px] text-muted-foreground">
      {timeTicks(duration).map((tick) => (
        <span
          key={tick}
          className="absolute border-l pl-1"
          style={{ left: `${progressPercent(tick, duration)}%` }}
        >
          {formatClock(tick)}
        </span>
      ))}
    </div>
  );
}
