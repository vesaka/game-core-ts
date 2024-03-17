const Modifiers = {
    '=': 'equalize',
    '+': 'increase',
    '-': 'decrease',

}
class Transformer {

    static modify(value: any, operator: string): any {
        if (operator === 'in' || operator === '!in') {
            return value.split(',');
        }
        if (operator === 'between' || operator === '!between') {
            return value.split(',');
        }

        return value;
    }

    static equalize(value: any, otherValue: any): boolean {
        return value = otherValue;
    }

    static increase(value: any, otherValue: any): boolean {
        return value += otherValue;
    }
}