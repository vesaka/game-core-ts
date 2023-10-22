import Shape from "./shape";

class Point extends Shape {

    protected x: number;

    protected y: number;

    protected tolerance: number;

    constructor(x: number, y: number, tolerance: number = 0) {
        super();
        this.x = x;
        this.y = y;
        this.tolerance = tolerance;
    }

    slope(point: Point): number|boolean {
        if(this.x === point.x) {
            return false;
        }

        return (this.y - point.y) / (this.x - point.x);
    }

    distance(point: Point): number {
        const a = this.x - point.x;
        const b = this.y - point.y;
        return Math.sqrt(a*a + b*b);
    }

    xInt(point: Point): number|boolean {
        if(this.y === point.y) {
            return 0 === this.x ? 0 : false;
        }

        if (this.x === point.x) {
            return this.x;
        }

        const slope = Number(this.slope(point));

        if (!slope) {
            return false;
        }

        return  (-1 * ((slope * this.x) - this.y)) / slope;

    }

    yInt(point: Point): number|boolean {
        if(this.x === point.x) {
            return 0 === this.y ? 0 : false;
        }

        if (this.y === point.y) {
            return this.y;
        }

        const slope = Number(this.slope(point));

        if (!slope) {
            return false;
        }

        return this.y - (slope * this.x);
    }

    polar(radius: number, angle: number = 0): Point {
        const theta = Math.tan(angle);
        const x = this.x + Math.cos(theta)*radius;
        const y = this.x + Math.sin(theta)*radius;
        return new Point(x, y);
    }
}

export default Point;