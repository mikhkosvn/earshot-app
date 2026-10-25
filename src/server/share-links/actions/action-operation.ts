export const ShareLinksActionOperation = {
  createShareLink: 'share_links.create_share_link',
  getSharedView: 'share_links.get_shared_view',
  getSharedResult: 'share_links.get_shared_result',
  listSharedRuns: 'share_links.list_shared_runs',
  getSharedRun: 'share_links.get_shared_run',
  getSharedConversation: 'share_links.get_shared_conversation',
} as const;

export type ShareLinksActionOperation =
  (typeof ShareLinksActionOperation)[keyof typeof ShareLinksActionOperation];
