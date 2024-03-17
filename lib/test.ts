
export const OPERATOR: {} = {
    '=': 'eq',
    '!=': 'neq',
    '>': 'gt',
    '>=': 'gte',
    '<': 'lt',
    '<=': 'lte',
    'in': 'in',
    '!in': 'notIn',
    'like': 'like',
    '!like': 'notLike',
    'between': 'between',
    '!between': 'notBetween',
    'isNull': 'isNull',
    '!isNull': 'notNull'


} 

class Test {

    static compare(value: any, otherValue: any, operator: string = '='): boolean {
        const param = this.getOperatorValue(operator, otherValue);
        
        switch (operator) {
            case '=':
                return this.eq(value, param);
            case '!=':
                return this.neq(value, param);
            case '>':
                return this.gt(value, param);
            case '>=':
                return this.gte(value, param);
            case '<':
                return this.lt(value, param);
            case '<=':
                return this.lte(value, param);
            case 'in':
                return this.in(value, param);
            case '!in':
                return this.notIn(value, param);
            case 'like':
                return this.like(value, param);
            case '!like':
                return this.notLike(value, param);
            case 'between':
                return this.between(value, param);
            case '!between':
                return this.notBetween(value, param);
            case 'isNull':
                return this.isNull(value);
            case '!isNull':
                return this.notNull(value);
            default:
                return false;
        }
    }

    static getOperatorValue(operator: string, value: any): any {
        if (operator === 'in' || operator === '!in') {
            return value.split(',');
        }
        if (operator === 'between' || operator === '!between') {
            return value.split(',');
        }

        return value;
    }

    static eq(value: any, otherValue: any): boolean {
        return value === otherValue;
    }

    static neq(value: any, otherValue: any): boolean {
        return value !== otherValue;
    }

    static gt(value: any, otherValue: any): boolean {
        return value > otherValue;
    }

    static gte(value: any, otherValue: any): boolean {
        return value >= otherValue;
    }

    static lt(value: any, otherValue: any): boolean {
        return value < otherValue;
    }

    static lte(value: any, otherValue: any): boolean {
        return value <= otherValue;
    }

    static in(value: any, otherValue: any): boolean {
        return otherValue.includes(value);
    }

    static notIn(value: any, otherValue: any): boolean {
        return !otherValue.includes(value);
    }

    static like(value: any, otherValue: any): boolean {
        return value.includes(otherValue);
    }

    static notLike(value: any, otherValue: any): boolean {
        return !value.includes(otherValue);
    }

    static between(value: any, otherValue: any): boolean {
        const [min, max] = otherValue;
        return value >= min && value <= max;
    }

    static notBetween(value: any, otherValue: any): boolean {
        const [min, max] = otherValue;
        return value < min || value > max;
    }

    static isNull(value: any): boolean {
        return value === null;
    }

    static notNull(value: any): boolean {
        return value !== null;
    }

}

export default Test;