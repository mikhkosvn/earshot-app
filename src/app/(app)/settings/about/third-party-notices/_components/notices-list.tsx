import { listThirdPartyNotices } from '@/server/third-party-notices/list-third-party-notices';

import { NoticeCard } from './notice-card';

export async function NoticesList() {
  const notices = await listThirdPartyNotices();

  return (
    <div className="flex flex-col gap-3">
      {notices.map((notice) => (
        <NoticeCard key={notice.name} notice={notice} />
      ))}
    </div>
  );
}
