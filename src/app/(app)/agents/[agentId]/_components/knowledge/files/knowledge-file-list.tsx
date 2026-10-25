'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../../_hooks/use-agent-id';
import { KnowledgeFileRow } from './knowledge-file-row';

export function KnowledgeFileList() {
  const agentId = useAgentId();
  const { data: files } = useSuspenseQuery(
    AgentService.getKnowledgeFilesQuery({ agentId }),
  );
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold">Uploaded Files</h3>
      <ul className="flex flex-col gap-1.5">
        {files.map((file) => (
          <KnowledgeFileRow key={file.id} file={file} />
        ))}
      </ul>
    </div>
  );
}
