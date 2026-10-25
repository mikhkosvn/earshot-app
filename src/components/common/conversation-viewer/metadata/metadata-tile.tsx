import type { ConversationMetadataTile } from '@/server/conversations/types';

type MetadataTileProps = {
  tile: ConversationMetadataTile;
};

export function MetadataTile({ tile }: MetadataTileProps) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-3 rounded-md border bg-muted/20 px-3 py-2.5 text-sm">
      <span className="shrink-0">{tile.key}</span>
      <span className="min-w-0 text-right break-all text-muted-foreground">
        {tile.value}
      </span>
    </div>
  );
}
