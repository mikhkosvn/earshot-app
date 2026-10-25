import type { ThirdPartyNotice } from '@/server/third-party-notices/types';

interface NoticeLicenseBodyProps {
  notice: ThirdPartyNotice;
}

export function NoticeLicenseBody({ notice }: NoticeLicenseBodyProps) {
  if (!notice.licenseText) {
    return (
      <p className="text-xs text-muted-foreground">
        {notice.license}. The package has no license file.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium">{notice.license}</p>
      <pre className="max-h-64 overflow-auto rounded-md bg-muted px-3 py-2 font-mono text-[11px] whitespace-pre-wrap">
        {notice.licenseText}
      </pre>
    </div>
  );
}
