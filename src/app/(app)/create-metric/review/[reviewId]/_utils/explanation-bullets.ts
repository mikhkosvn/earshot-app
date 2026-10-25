const parseArray = (item: string): string[] => {
  const text = item.trim();
  if (!text.startsWith('[')) return [text];
  try {
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return [text];
    return parsed.map((entry) => String(entry));
  } catch {
    return [text];
  }
};

export const explanationBullets = (explanation: string[]) =>
  explanation.flatMap(parseArray).filter((bullet) => bullet.length > 0);
