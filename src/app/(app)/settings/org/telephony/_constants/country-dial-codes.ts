export type CountryDialCode = {
  iso: string;
  name: string;
  dialCode: string;
};

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { iso: 'US', name: 'United States', dialCode: '1' },
  { iso: 'CA', name: 'Canada', dialCode: '1' },
  { iso: 'GB', name: 'United Kingdom', dialCode: '44' },
  { iso: 'IE', name: 'Ireland', dialCode: '353' },
  { iso: 'AU', name: 'Australia', dialCode: '61' },
  { iso: 'NZ', name: 'New Zealand', dialCode: '64' },
  { iso: 'DE', name: 'Germany', dialCode: '49' },
  { iso: 'FR', name: 'France', dialCode: '33' },
  { iso: 'ES', name: 'Spain', dialCode: '34' },
  { iso: 'IT', name: 'Italy', dialCode: '39' },
  { iso: 'NL', name: 'Netherlands', dialCode: '31' },
  { iso: 'PL', name: 'Poland', dialCode: '48' },
  { iso: 'UA', name: 'Ukraine', dialCode: '380' },
  { iso: 'IN', name: 'India', dialCode: '91' },
  { iso: 'SG', name: 'Singapore', dialCode: '65' },
  { iso: 'JP', name: 'Japan', dialCode: '81' },
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '971' },
  { iso: 'ZA', name: 'South Africa', dialCode: '27' },
  { iso: 'BR', name: 'Brazil', dialCode: '55' },
  { iso: 'MX', name: 'Mexico', dialCode: '52' },
];

export const DEFAULT_COUNTRY = COUNTRY_DIAL_CODES[0];

export const COUNTRY_ITEMS = COUNTRY_DIAL_CODES.map((country) => ({
  value: country.iso,
  label: `${country.iso} +${country.dialCode}`,
}));
