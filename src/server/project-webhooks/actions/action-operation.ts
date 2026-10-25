export const ProjectWebhooksActionOperation = {
  getProjectWebhook: 'project_webhooks.get_project_webhook',
  saveProjectWebhook: 'project_webhooks.save_project_webhook',
  testProjectWebhook: 'project_webhooks.test_project_webhook',
} as const;

export type ProjectWebhooksActionOperation =
  (typeof ProjectWebhooksActionOperation)[keyof typeof ProjectWebhooksActionOperation];
