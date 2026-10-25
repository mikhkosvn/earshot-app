'use client';

import { useConversation } from '../_hooks/use-conversation';
import { ViewerCollapsibleCard } from '../viewer-collapsible-card';
import { MetadataTile } from './metadata-tile';

interface ConversationMetadataCardProps {
  conversationId: number;
  shareToken?: string | null;
}

export function ConversationMetadataCard({
  conversationId,
  shareToken = null,
}: ConversationMetadataCardProps) {
  const { metadata } = useConversation({ conversationId, shareToken });
  if (metadata.length === 0) return null;

  return (
    <ViewerCollapsibleCard
      title="Metadata"
      description="Includes run details like agent, personality, test profile, and dynamic variables used for the evaluation."
      total={metadata.length}
    >
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {metadata.map((tile) => (
          <MetadataTile key={tile.key} tile={tile} />
        ))}
      </div>
    </ViewerCollapsibleCard>
  );
}
