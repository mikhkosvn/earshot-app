import { CallsEmptyBanner } from './calls-empty-banner';
import { ConnectProviderCard } from './connect-provider-card';

export function CallsEmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 py-10">
      <CallsEmptyBanner />
      <ConnectProviderCard />
    </div>
  );
}
