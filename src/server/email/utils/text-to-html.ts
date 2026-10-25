import 'server-only';

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);

export const textToHtml = (text: string) =>
  text
    .split(/\n{2,}/)
    .map(
      (paragraph) =>
        `<p style="margin:0 0 12px">${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`,
    )
    .join('');
