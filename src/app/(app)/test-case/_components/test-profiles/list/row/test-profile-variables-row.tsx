import { TableCell, TableRow } from '@/components/ui/table';
import type { TestProfileView } from '@/server/test-profiles/types';

import { VariableList } from './variable-list';

interface TestProfileVariablesRowProps {
  profile: TestProfileView;
  isExpanded: boolean;
}

export function TestProfileVariablesRow({
  profile,
  isExpanded,
}: TestProfileVariablesRowProps) {
  if (!isExpanded) return null;

  return (
    <TableRow className="bg-muted/30 hover:bg-muted/30">
      <TableCell colSpan={8}>
        <div className="grid gap-4 p-2 md:grid-cols-2">
          <VariableList
            title="Main agent variables"
            variables={profile.mainAgentVariables}
          />
          <VariableList
            title="Testing agent variables"
            variables={profile.testingAgentVariables}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
