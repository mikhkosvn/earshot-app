import type { LucideIcon } from 'lucide-react';

interface CardDetailRowProps {
  icon: LucideIcon;
  text: string;
}

export function CardDetailRow({ icon: Icon, text }: CardDetailRowProps) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="size-3.5 shrink-0" />
      {text}
    </li>
  );
}
