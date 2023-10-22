import Shape from "./shape";
import Point from "./point.shape";

class Line extends Shape {
    protected a: Point;
    protected b: Point;
    protected tolerance: number;

    constructor(a: Point, b: Point, tolerance: number = 0) {
        super();
        this.a = a;
        this.b = b;
        this.tolerance = tolerance;
    }

    slope(): number|boolean {
        return this.a.slope(this.b);
    }

    xInt(): number|boolean {
        return this.a.xInt(this.b);
    }

    yInt(): number|boolean {
        return this.a.yInt(this.b);
    }

    distance(): number {
        return this.a.distance(this.b);
    }


}

export default Line;