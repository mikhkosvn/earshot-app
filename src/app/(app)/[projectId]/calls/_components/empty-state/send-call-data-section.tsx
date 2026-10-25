import {
  CALL_PROVIDER_EXAMPLE_LABEL,
  type CallProvider,
} from '../../_constants/call-providers';
import { SnippetCodePanel } from './snippet-code-panel';

type SendCallDataSectionProps = {
  provider: CallProvider;
};

export function SendCallDataSection({ provider }: SendCallDataSectionProps) {
  return (
    <div className="flex flex-col border-t">
      <div className="flex flex-col gap-0.5 border-b px-3 py-2.5">
        <h3 className="text-xs font-semibold">Send call data</h3>
        <p className="text-[11px] text-muted-foreground">
          {CALL_PROVIDER_EXAMPLE_LABEL[provider]} integration example
        </p>
      </div>
      <SnippetCodePanel />
    </div>
  );
}
