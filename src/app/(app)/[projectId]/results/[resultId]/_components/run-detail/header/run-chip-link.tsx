import { ArrowUpRightIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';

type RunChipLinkProps = {
  href: Route | null;
  label?: string;
};

export function RunChipLink({ href, label }: RunChipLinkProps) {
  if (href === null) return null;

  return (
    <Link
      href={href}
      aria-label={label}
      className="text-muted-foreground hover:text-foreground"
    >
      <ArrowUpRightIcon className="size-3.5" />
    </Link>
  );
}
