
class Shape {
    protected static CIRCLE = 0;
    protected static POINT = 1;
    protected static LINE = 2;
    protected static TRIANGLE = 3;
    protected static RECTANGLE = 4;
    protected static POLYGON = 5;
    protected static CURVE = 6;
    protected static ELLIPSE = 7;


    private __shape: string;
    protected __type: number;



    constructor() {
        const name: string = this.constructor.name.toUpperCase();
        this.__shape = name.toLowerCase();
        this.__type = types[name.toUpperCase() as keyof typeof types];
    }

    get name(): string {
        return this.__shape;
    }

    is(shape: string|number): boolean {
        if(typeof shape === "string") {
            return this.__shape === shape;
        }

        if (typeof shape === "number") {
            return this.__type === shape;
        }

        return false
    }

    isOneOf(...shapes: string[]|number[]): boolean {
        for(const shape of shapes) {
            if(this.is(shape)) {
                return true;
            }
        }

        return false;
    }

    colides(shape: Shape): boolean {
        if (typeof shape !== 'object' && null !== shape) {
            return false;
        }

        const method = `colides_${shape.name}}` as keyof typeof this;
        if (typeof this[method] === 'function') {
            // return this[method].apply(this, args);
        }

        return false;
    }

}


enum types {
    CIRCLE = 0,
    POINT = 1,
    LINE = 2,
    TRIANGLE = 3,
    RECTANGLE = 4,
    POLYGON = 5,
    CURVE = 6,
    ELLIPSE = 7
};

export const MAX_DISTANE = 10000;
export const MIN_DISTANCE = -10000;

export default Shape;