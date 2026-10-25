'use client';

import { UserMinusIcon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import type { MemberRow } from '@/server/members/types';

import { useRemoveMemberMutation } from '../../_hooks/mutations/use-remove-member-mutation';
import { useIsOrganizationAdmin } from '../../_hooks/use-is-organization-admin';

interface RemoveMemberButtonProps {
  member: MemberRow;
}

export function RemoveMemberButton({ member }: RemoveMemberButtonProps) {
  const isAdmin = useIsOrganizationAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const removeMember = useRemoveMemberMutation();
  if (!isAdmin || member.isCurrentUser) return null;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Remove ${member.email}`}
        className="text-destructive hover:text-destructive"
        onClick={() => setIsOpen(true)}
      >
        <UserMinusIcon />
      </Button>
      <DeleteConfirmDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        isPending={removeMember.isPending}
        description={`${member.name} loses access to every project of this organization.`}
        onConfirm={() =>
          removeMember.mutate(
            { memberId: member.id },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setIsOpen(false);
              },
            },
          )
        }
      />
    </>
  );
}
