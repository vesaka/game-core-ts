export const cx = (list: ClassList, classList: ClassList | string = ''): ClassList => {
    if (typeof classList === 'string') {
        list[classList] = true;
    }

    return Object.assign(list, classList) as ClassList;
};

export const camelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

export const kebabCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const snakeCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

export const pascalCase = (str: string): string => {
    return str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
};