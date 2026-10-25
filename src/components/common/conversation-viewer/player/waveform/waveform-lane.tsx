import { downsamplePeaks } from '../../_utils/waveform-bars';

const LANE_HEIGHT = 40;
const BAR_STEP = 3;
const BAR_WIDTH = 2;
const MIN_BAR_HEIGHT = 1;

type WaveformLaneProps = {
  peaks: number[];
  className: string;
};

export function WaveformLane({ peaks, className }: WaveformLaneProps) {
  const bars = downsamplePeaks(peaks);
  const width = Math.max(bars.length, 1) * BAR_STEP;
  const middle = LANE_HEIGHT / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${LANE_HEIGHT}`}
      preserveAspectRatio="none"
      className="h-10 w-full"
      aria-hidden="true"
    >
      <line
        x1={0}
        x2={width}
        y1={middle}
        y2={middle}
        className="stroke-muted-foreground/40"
        strokeDasharray="2 3"
        vectorEffect="non-scaling-stroke"
      />
      {bars.map((peak, index) => {
        const height = Math.max(peak * LANE_HEIGHT, MIN_BAR_HEIGHT);
        return (
          <rect
            key={index}
            x={index * BAR_STEP}
            y={middle - height / 2}
            width={BAR_WIDTH}
            height={height}
            className={className}
          />
        );
      })}
    </svg>
  );
}
