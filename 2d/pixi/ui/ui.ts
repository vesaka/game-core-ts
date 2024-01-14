import Container from "@/core/container";
import { snakeCase } from "@/core/utils/string.util";

class UI extends Container{
    protected name: string;

    constructor(options: AnyObject) {
        super();

        this.name = snakeCase(this.constructor.name);

        this.applyFilters(options);
        
    }

    filter_position(position: Vector2D): Vector2D {
        const { screen } = this.app;

        if (position.x >= 0 && position.x <= 1) {
            position.x *= screen.width;
        }

        if (position.y >= 0 && position.y <= 1) {
            position.y *= screen.height;
        }

        return position;
    }

    filter_size(size: Size2D): Size2D {
        const { screen } = this.app;

        if (size.width >= 0 && size.width <= 1) {
            size.width *= screen.width;
        }

        if (size.height >= 0 && size.height <= 1) {
            size.height *= screen.height;
        }

        return size;
    }
}

export default UI;