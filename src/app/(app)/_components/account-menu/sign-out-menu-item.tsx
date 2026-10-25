'use client';

import { LogOutIcon } from 'lucide-react';

import { useSignOutMutation } from '@/app/(app)/_hooks/mutations/account-menu/use-sign-out-mutation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function SignOutMenuItem() {
  const signOut = useSignOutMutation();

  return (
    <DropdownMenuItem
      variant="destructive"
      className="text-xs"
      disabled={signOut.isPending}
      onClick={() => signOut.mutate()}
    >
      <LogOutIcon />
      Sign out
    </DropdownMenuItem>
  );
}
