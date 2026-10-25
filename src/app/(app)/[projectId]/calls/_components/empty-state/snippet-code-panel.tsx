'use client';

import { CopyStateIcon } from '@/components/common/clipboard/copy-state-icon';
import { useCopyToClipboard } from '@/components/common/clipboard/use-copy-to-clipboard';
import { Button } from '@/components/ui/button';

import { useAppOrigin } from '../../_hooks/use-app-origin';
import { observeSnippet } from '../../_utils/observe-snippet';
import { SnippetLanguageSelect } from './snippet-language-select';

export function SnippetCodePanel() {
  const origin = useAppOrigin();
  const { isCopied, copy } = useCopyToClipboard();
  const code = observeSnippet(origin);

  return (
    <div className="m-3 flex flex-col rounded-md border bg-muted/40">
      <div className="flex items-center justify-between gap-2 p-2">
        <SnippetLanguageSelect />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => copy(code)}
        >
          <CopyStateIcon isCopied={isCopied} />
          Copy code
        </Button>
      </div>
      <pre className="max-h-96 overflow-auto px-4 pb-4 font-mono text-xs/5">
        <code>{code}</code>
      </pre>
    </div>
  );
}
