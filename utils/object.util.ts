export const raw = <T = object>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

export const isObject = (item: unknown) => {
    return ((null !== item) && (typeof item === 'object') && !Array.isArray(item));
};

export const deepMerge = (target: AnyObject, source: AnyObject): Object => {

    for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key])
                Object.assign(target, {[key]: {}});
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, {[key]: source[key]});
        }
    }
    return target;
};

export const extend = (target: AnyObject, source: AnyObject): Object => {
    target = raw(target) as AnyObject;
    for (const key in source) {
        if (isObject(source[key])) {
            if (!target[key]) {
                target[key] = {};
            }
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, {[key]: source[key]});
        }
    }
    return target;
};

export const deepGet = (obj: AnyObject | any, path: string, defaultValue: any = null) => {
    let i, key, keys = path.split('.');
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        if (!obj || !obj.hasOwnProperty(key) || !isSafeKey(key)) {
            obj = defaultValue;
            break;
        }
        obj = obj[key];
    }
    return obj;
};

export const deepSet = (obj: AnyObject, path: string, value: any) => {
    let i, key, keys = path.split('.');
    for (i = 0; i < keys.length - 1; i++) {
        key = keys[i];
        if (!obj[key] || !isSafeKey(key)) {
            obj[key] = {};
        }
        obj = obj[key];
    }
    obj[keys[i]] = value;
}

const isSafeKey = <T = string>(key: T) => {
    return key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
};