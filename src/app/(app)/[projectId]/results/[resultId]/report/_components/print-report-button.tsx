'use client';

import { PrinterIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function PrintReportButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="print:hidden"
      onClick={() => window.print()}
    >
      <PrinterIcon />
      Print
    </Button>
  );
}
