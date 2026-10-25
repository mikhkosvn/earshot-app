import { CopyButton } from '@/components/common/clipboard/copy-button';
import { ChatRole } from '@/generated/prisma/enums';
import type { GenerationMessageView } from '@/server/evaluator-generation/types';

type ChatMessageProps = {
  message: GenerationMessageView;
};

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === ChatRole.user) {
    return (
      <div className="ml-10 self-end rounded-2xl bg-muted px-3.5 py-2 text-sm whitespace-pre-wrap">
        {message.content}
      </div>
    );
  }
  return (
    <div className="group flex flex-col gap-1">
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      <CopyButton
        value={message.content}
        label="Copy message"
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      />
    </div>
  );
}
