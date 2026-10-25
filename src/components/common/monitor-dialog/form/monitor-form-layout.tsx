import type { FormEventHandler, ReactNode } from 'react';

import { MonitorSummaryPanel } from '../summary/monitor-summary-panel';
import { MonitorSubmitButton } from './monitor-submit-button';

interface MonitorFormLayoutProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitLabel: ReactNode;
  children: ReactNode;
}

export function MonitorFormLayout({
  onSubmit,
  submitLabel,
  children,
}: MonitorFormLayoutProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="grid min-h-0 flex-1 gap-3 overflow-y-auto bg-muted/40 p-3 md:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex min-w-0 flex-col gap-3">{children}</div>
        <div className="md:sticky md:top-0 md:self-start">
          <MonitorSummaryPanel />
        </div>
      </div>
      <div className="border-t bg-background p-3">
        <MonitorSubmitButton>{submitLabel}</MonitorSubmitButton>
      </div>
    </form>
  );
}
