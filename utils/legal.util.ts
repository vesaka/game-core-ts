import countries from '@/core/sources/countries.json';

export const getLegalAge = (): number => {
    const countryCode = 'BG';
    const country = countries.find((country:any) => country.code === countryCode);
    if (country && country.legalAge) {
        return country.legalAge;
    }
    return 18;
}