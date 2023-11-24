export const between = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

export const rand = (min: number, max: number): number => {
    return ~~(Math.random() * (max - min + 1) + min);
};

export const factoriel = (num: number): number => {
    let val = 1;

    for (let i = 2; i <= num; i++)
        val = val * i;
    return val;
};

export const degrees = (angle: number): number => {
    return angle * (180 / Math.PI);
};

export const radians = (angle: number): number => {
    return angle * (Math.PI / 180);
};

export const binom = (n: number, k: number): number => {
    return factoriel(n) / (factoriel(k) * factoriel(n - k));
};

export const radius = (point: Array<number> | Vector2D): number => {
    if (Array.isArray(point)) {
        point = {x: point[0] || 0, y: point[1]};
    }
    return Math.round(Math.sqrt(point.x * point.x + point.y * point.y));
};

export const rotate = (x: number, y: number, cx: number, cy: number, angle: number = 0): Vector2D => {
    let rotate = radians(angle),
            cos = Math.cos(rotate),
            sin = Math.sin(rotate);

    return {
        x: (cos * (x - cx)) + (sin * (y - cy)) + cx,
        y: (cos * (y - cy)) - (sin * (x - cx)) + cy
    };
};

export const fixed = (num: number): number => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const roll = (options: AnyObject = {}) => {
    let cases: {[key: string]: any} = {}, roll = Math.floor(Math.random() * 100) + 1,
            keys = [],
            result = options.default || null;

    options[0] = null;
    options[101] = options.default || null;

    for (let key in options) {
        let chance = parseInt(key);
        if (!isNaN(chance)) {
            cases[key] = options[key];
            keys.push(key);
        }
    }

    for (let key = 1; key < keys.length; key++) {
        let chance = parseInt(keys[key]),
                previous = parseInt(keys[key - 1]);
        if ((roll >= previous) && (roll < chance)) {
            result = cases[keys[key]];
            break;
        }
    }

    return typeof result === 'function' ? result() : result;
};

export const decimals = (num: number): number => {
    if (Math.floor(num.valueOf()) === num.valueOf()) {
        return 0;
    }
    return num.toString().split(".")[1].length || 0;
};

export const percents = (num: number, n: number): number => {
    if (0 === num) {
        return 0;
    }
    return (100 * n) / num;
};

export const normalize = (v: number, vmin: number, vmax: number, tmin: number, tmax: number): number => {
    const nv = Math.max(Math.min(v, vmax), vmin);
    return tmin + (((nv - vmin) / (vmax - vmin)) * (tmax - tmin));
};

export const round = (num: number, to: number): number => {
    return Math.round(num / to) * to;
};

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const randFromArray = (value: Array<number>): number => {
    if (Array.isArray(value)) {
        return rand(Number(value[0]), Number(value[1]));
    }
    
    return value;
};