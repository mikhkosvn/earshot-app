const WORD_NAMES: Record<string, string> = {
  infra: 'infrastructure',
};

const SECOND_SUFFIXES = ['timeout', 'duration'];

const wordName = (word: string) => WORD_NAMES[word] ?? word;

const unitText = (words: string[]) => {
  if (SECOND_SUFFIXES.includes(words[words.length - 1])) return ' (seconds)';
  return '';
};

export const configurationLabel = (key: string) => {
  const words = key.split('_').filter(Boolean);
  const text = words.map(wordName).join(' ');
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}${unitText(words)}`;
};
