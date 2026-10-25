export const ThemeMode = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export const THEME_OPTIONS = [
  { value: ThemeMode.light, label: 'Light' },
  { value: ThemeMode.dark, label: 'Dark' },
  { value: ThemeMode.system, label: 'System' },
];
