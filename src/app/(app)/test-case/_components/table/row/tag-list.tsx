import { Badge } from '@/components/ui/badge';

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex max-w-48 flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-[11px]">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
