export const cx = (list: ClassList, classList: ClassList | string = ''): ClassList => {
    if (typeof classList === 'string') {
        list[classList] = true;
    }

    return Object.assign(list, classList) as ClassList;
};

export const camelCase = (str: string): string => {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^\w/, c => c.toLowerCase()); 
};

export const kebabCase = (str: string): string => {
    return str.trim()
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]+/g, '-')
        .toLowerCase();
};

export const snakeCase = (str: string): string => {
    return str.trim()
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase();
};

export const pascalCase = (str: string): string => {
    return ucfirst(camelCase(str));
};

export const ucfirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const oddPluralWords: AnyObject = {
    'child': 'children',
    'person': 'people',
    'goose': 'geese',
    "man": "men",
    "woman": "women",
    "tooth": "teeth",
    "foot": "feet",
    "mouse": "mice",
    "louse": "lice",
    "cactus": "cacti",
    "focus": "foci",
    "fungus": "fungi",
    "nucleus": "nuclei",
    "syllabus": "syllabi",
    "phenomenon": "phenomena",
    "criterion": "criteria",
    "datum": "data",
    "medium": "media",
    "symposium": "symposia",
    "bacterium": "bacteria",
    "curriculum": "curricula",
    "memorandum": "memoranda"
}

export const pluralize = (str: string): string => {
    if (oddPluralWords[str]) {
        return oddPluralWords[str];
    } else if (/(is|us)$/.test(str)) {
        return str.replace(/(is|us)$/, 'es');
    } else if (/(f|fe)$/.test(str)) {
        return str.replace(/(f|fe)$/, 'ves');
    } else if (str.endsWith('s')) {
        return str;
    } else if (/(x|s|z|sh|ch|o)$/.test(str)) {
        return str + 'es';
    } else if (/[^aeiou]y$/.test(str)) { // give me some examples of words that end in y but are not preceded by a vowel
        return str.slice(0, -1) + 'ies';
    }else if (/(on)$/.test(str)) {
        return str + 'a';
    } else if (/(um)$/.test(str)) {
        return str.replace(/um$/, 'a');
    }
    return str + 's';
}

const oddSingularWords: AnyObject = {
    knives: 'knife',
    wives: 'wife',
    wolves: 'wolf',
    analyses: 'analysis',
    criteria: 'criterion',
}

export const singularize = (str: string): string => {
    for (const [key, value] of Object.entries(oddPluralWords)) {
        if (value === str) {
            return key;
        }
    } 
    
    if (oddSingularWords[str]) {
        return oddSingularWords[str];
    }
    
    if (/(x|s|z|sh|ch|o)es$/.test(str)) {
        return str.slice(0, -2);
    } else if (/[^aeiou]ies$/.test(str)) {
        return str.slice(0, -3) + 'y';
    } else if (/ves$/.test(str)) {
        return str.replace(/ves$/, 'f');
    }
    return str.slice(0, -1);
}