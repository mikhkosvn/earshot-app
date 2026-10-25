import {
  COUNTRY_DIAL_CODES,
  DEFAULT_COUNTRY,
  type CountryDialCode,
} from '../_constants/country-dial-codes';

const BY_LONGEST_DIAL_CODE = [...COUNTRY_DIAL_CODES].sort(
  (left, right) => right.dialCode.length - left.dialCode.length,
);

export const findCountryByIso = (iso: string) =>
  COUNTRY_DIAL_CODES.find((country) => country.iso === iso) ?? DEFAULT_COUNTRY;

export const findCountryForPhoneNumber = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/^\+/, '');
  return (
    BY_LONGEST_DIAL_CODE.find((country) =>
      digits.startsWith(country.dialCode),
    ) ?? DEFAULT_COUNTRY
  );
};

export const nationalPart = (phoneNumber: string, country: CountryDialCode) => {
  const digits = phoneNumber.replace(/^\+/, '');
  if (!digits.startsWith(country.dialCode)) return digits;
  return digits.slice(country.dialCode.length);
};

export const joinPhoneNumber = (country: CountryDialCode, national: string) => {
  const digits = national.replace(/\D/g, '');
  if (!digits) return '';
  return `+${country.dialCode}${digits}`;
};
