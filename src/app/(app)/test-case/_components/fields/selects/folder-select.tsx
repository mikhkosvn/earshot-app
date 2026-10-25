'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { FolderIcon } from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionSelect } from '../option-select';

type FolderSelectProps = {
  id?: string;
  value: string | null;
  onValueChange: (path: string | null) => void;
  invalid?: boolean;
  projectId?: number;
  className?: string;
  placeholder?: string;
};

export function FolderSelect({
  id,
  value,
  onValueChange,
  invalid,
  projectId,
  className,
  placeholder = 'Select folder',
}: FolderSelectProps) {
  const currentProjectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getFoldersQuery({
      projectId: projectId ?? currentProjectId,
    }),
    select: (folders) =>
      folders.map((folder) => ({ value: folder.path, label: folder.path })),
  });

  return (
    <OptionSelect
      id={id}
      items={items}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      icon={<FolderIcon className="text-muted-foreground" />}
      invalid={invalid}
      className={className}
    />
  );
}
