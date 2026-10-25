import { Badge } from '@/components/ui/badge';

type MemberYouBadgeProps = {
  isCurrentUser: boolean;
};

export function MemberYouBadge({ isCurrentUser }: MemberYouBadgeProps) {
  if (!isCurrentUser) return null;

  return (
    <Badge variant="outline" className="h-4 px-1 text-[10px] font-normal">
      You
    </Badge>
  );
}
