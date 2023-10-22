import Shape from "./shape";
import Point from "./point.shape";

class Circle extends Shape {
    protected center: Point;
    protected radius: number;
    protected tolerance: number;

    constructor(center: Point, radius: number, tolerance: number = 0) {
        super();
        this.center = center;
        this.radius = radius;
        this.tolerance = tolerance;
    }

    area(f: number = 2): number {
        return Number((Math.PI * this.radius * this.radius).toFixed(f));
    }

    circumference(): number {
        return 2 * Math.PI * this.radius;
    }

    diameter(): number {
        return 2 * this.radius;
    }

    distance(point: Point): number {
        return this.center.distance(point);
    }

    slope(point: Point): number|boolean {
        return this.center.slope(point);
    }

    xInt(point: Point): number|boolean {
        return this.center.xInt(point);
    }

    yInt(point: Point): number|boolean {
        return this.center.yInt(point);
    }
}

export default Circle;