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

    filter_offset(offset: Vector2D): Vector2D {
        const { screen } = this.app;

        if (offset.x >= 0 && offset.x <= 1) {
            offset.x *= screen.width;
        }

        if (offset.y >= 0 && offset.y <= 1) {
            offset.y *= screen.height;
        }

        return offset;
    }

    
    t(key: string, def: string = ''): string {
        // console.log(this.i18n.messages, this.i18n.messages[this.i18n.locale], key);  
        return this.i18n.get(key, def);  
    }

    translate(key: string, def: string = ''): string {
        return this.i18n.get(key, def);
    }
}

export default UI;