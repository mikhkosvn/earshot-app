'use client';

import { ActivityCard } from './activity/activity-card';
import { AlertStatCards } from './stats/alert-stat-cards';
import { FiredAlertsCard } from './fired/fired-alerts-card';

export function AlertReviewSection() {
  return (
    <div className="flex flex-col gap-3">
      <AlertStatCards />
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <ActivityCard />
        <FiredAlertsCard />
      </div>
    </div>
  );
}
