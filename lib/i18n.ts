import { deepGet, deepMerge } from '@/core/utils/object.util';

class I18n {

    protected defaultLocale: string = 'en';

    protected locale: string = 'en';

    protected messages: any = {};

    protected base: string;

    protected env: string = import.meta.env.MODE;

    constructor(defaultLocale: string = 'en', base: string = '', path: string = 'app') {
        this.defaultLocale = defaultLocale;
        this.base = base;
        this.load(path);
        this.env = import.meta.env.MODE;
    }

    async _load(path: string): Promise<void> {
        const { messages, locale, base } = this;
        if (!messages[locale]) {
            messages[locale] = {};
        }
        
        if (!messages[locale][path]) {
            let data: ApiResponse = {};
            try {
                const fallbackData: ApiResponse = await import(/* @vite-ignore */`${base}${this.defaultLocale}/${path}.json`)

                if (locale === this.defaultLocale) {
                    data = fallbackData.default;
                } else {
                    data = await import(/* @vite-ignore */`${base}${locale}/${path}.json`)
                    data = deepMerge(fallbackData.default, data.default);
                }

            } catch (e: any) {
                console.log(e);
                data = {};
            }
            messages[locale][path] = data || {};
        }
    }

    async load(path: string): Promise<any> {
        const { messages, locale, base } = this;
        if (!messages[locale]) {
            messages[locale] = {};
        }
        
        if (!messages[locale][path]) {
            return import(/* @vite-ignore */`${base}${this.defaultLocale}/${path}.json`).then((result: { default: any }) => {
                if (locale !== this.defaultLocale) {   
                    return import(/* @vite-ignore */`${base}${locale}/${path}.json`).then((data: { default: any }) => {
                        messages[locale][path] = deepMerge(result.default, data.default);
                        return Promise.resolve(messages[locale]);
                    });                
                }
                messages[locale][path] = result.default || {};
                return Promise.resolve(messages[locale]);
            });
        }

        return Promise.resolve(messages[locale]);
    }

    setLocale(locale: string): void {
        this.locale = locale;
    }

    get(path: string, def: string = ''): string {
        try {
            return deepGet(this.messages[this.locale], path) || def;
        } catch (ex) {
            return def;
        }
    }
}

export default I18n;