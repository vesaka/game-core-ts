import Shape from "./shape";
import Point from "./point.shape";

class Polygon extends Shape {

    points: Point[];
    
    constructor(points: Point[]) {
        super();
        this.points = points;
    }


}

export default Polygon;