import { cn } from '@/lib/utils';

type UserAvatarProps = {
  className?: string;
};

export function UserAvatar({ className }: UserAvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'block size-8 shrink-0 rounded-full bg-linear-to-br from-blue-500 via-violet-500 to-fuchsia-600',
        className,
      )}
    />
  );
}
