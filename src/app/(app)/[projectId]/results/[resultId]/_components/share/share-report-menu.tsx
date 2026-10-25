'use client';

import { DownloadIcon, Share2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCreateResultShareLinkMutation } from '../../_hooks/mutations/use-create-result-share-link-mutation';
import { ReportMetricsDialog } from './report-metrics-dialog';

export function ShareReportMenu() {
  const [reportOpen, setReportOpen] = useState(false);
  const shareLink = useCreateResultShareLinkMutation();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="sm" />}>
          <Share2Icon />
          Share Report
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            disabled={shareLink.isPending}
            onClick={() => shareLink.mutate()}
          >
            <Share2Icon />
            Generate Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReportOpen(true)}>
            <DownloadIcon />
            Download PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ReportMetricsDialog open={reportOpen} onOpenChange={setReportOpen} />
    </>
  );
}
