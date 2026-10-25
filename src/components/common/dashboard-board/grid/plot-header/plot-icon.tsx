import {
  ActivityIcon,
  ChartColumnIcon,
  ChartPieIcon,
  ChartScatterIcon,
  ListIcon,
  type LucideIcon,
  TrendingUpIcon,
} from 'lucide-react';

import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';

const DISPLAY_ICON: Record<PlotDisplayType, LucideIcon> = {
  [PlotDisplayType.line]: TrendingUpIcon,
  [PlotDisplayType.bar]: ChartColumnIcon,
  [PlotDisplayType.scatter]: ChartScatterIcon,
  [PlotDisplayType.pie]: ChartPieIcon,
  [PlotDisplayType.list]: ListIcon,
  [PlotDisplayType.stat]: ActivityIcon,
};

type PlotIconProps = {
  displayType: PlotDisplayType;
  className?: string;
};

export function PlotIcon({ displayType, className }: PlotIconProps) {
  const Icon = DISPLAY_ICON[displayType];
  return <Icon aria-hidden className={className} />;
}
