export type CountryDialCode = {
  iso: string;
  name: string;
  dialCode: string;
  flag: string;
};

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { iso: 'US', name: 'United States', dialCode: '1', flag: '🇺🇸' },
  { iso: 'CA', name: 'Canada', dialCode: '1', flag: '🇨🇦' },
  { iso: 'GB', name: 'United Kingdom', dialCode: '44', flag: '🇬🇧' },
  { iso: 'IE', name: 'Ireland', dialCode: '353', flag: '🇮🇪' },
  { iso: 'AU', name: 'Australia', dialCode: '61', flag: '🇦🇺' },
  { iso: 'NZ', name: 'New Zealand', dialCode: '64', flag: '🇳🇿' },
  { iso: 'DE', name: 'Germany', dialCode: '49', flag: '🇩🇪' },
  { iso: 'FR', name: 'France', dialCode: '33', flag: '🇫🇷' },
  { iso: 'ES', name: 'Spain', dialCode: '34', flag: '🇪🇸' },
  { iso: 'IT', name: 'Italy', dialCode: '39', flag: '🇮🇹' },
  { iso: 'NL', name: 'Netherlands', dialCode: '31', flag: '🇳🇱' },
  { iso: 'PL', name: 'Poland', dialCode: '48', flag: '🇵🇱' },
  { iso: 'UA', name: 'Ukraine', dialCode: '380', flag: '🇺🇦' },
  { iso: 'IN', name: 'India', dialCode: '91', flag: '🇮🇳' },
  { iso: 'SG', name: 'Singapore', dialCode: '65', flag: '🇸🇬' },
  { iso: 'JP', name: 'Japan', dialCode: '81', flag: '🇯🇵' },
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '971', flag: '🇦🇪' },
  { iso: 'ZA', name: 'South Africa', dialCode: '27', flag: '🇿🇦' },
  { iso: 'BR', name: 'Brazil', dialCode: '55', flag: '🇧🇷' },
  { iso: 'MX', name: 'Mexico', dialCode: '52', flag: '🇲🇽' },
];

export const DEFAULT_COUNTRY = COUNTRY_DIAL_CODES[0];

export const COUNTRY_ITEMS = COUNTRY_DIAL_CODES.map((country) => ({
  value: country.iso,
  label: `${country.flag} +${country.dialCode}`,
}));
