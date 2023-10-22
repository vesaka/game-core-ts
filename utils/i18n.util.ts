import I18n from '@/core/lib/i18n';

export let i18n: I18n;

export const createI18n = (locale: string = 'en', base: string = '', path: string = 'app') => {
    i18n = new I18n(locale, base, path);
    return useI18n();
}

export const t = (path: string, def : string = ''): string => i18n.get(path, def);

export const useI18n = () => ({ t, i18n });