import { z } from 'zod';

const bulletListSchema = z.array(z.unknown().transform(String));

const parseArray = (item: string): string[] => {
  const text = item.trim();
  if (!text.startsWith('[')) return [text];
  try {
    const parsed = bulletListSchema.safeParse(JSON.parse(text));
    if (!parsed.success) return [text];
    return parsed.data;
  } catch {
    return [text];
  }
};

export const explanationBullets = (explanation: readonly string[]) =>
  explanation.flatMap(parseArray).filter((bullet) => bullet.length > 0);
