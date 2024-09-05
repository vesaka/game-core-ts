import Container from "@/core/container";
import { snakeCase } from "@/core/utils/string.util";
import { hex2base } from "@/core/utils/colors.util";
import { Graphics, LineStyle } from "pixi.js";

class UI<T = UiOptions, K = Graphics> extends Container<AnyObject>{
    
    view: K;

    protected name: string;

    size: ValueOf<UiOptions>;

    position: ValueOf<UiOptions>;

    offset: ValueOf<UiOptions>;

    margin: ValueOf<UiOptions>;

    padding: ValueOf<UiOptions>;

    constructor(options: T, bounds?: Size2D) {
        super();
        if (bounds || (options as UiOptions).bounds) {
            this.bounds = bounds;
        }
        this.name = snakeCase(this.constructor.name);
        this.applyFilters(options);
        this.view = this.createView();
        
    }

    createView(): K {
        return new Graphics() as K;
    }

    filter_position(position: Vector2D): Vector2D {
        const screen = this.bounds || this.app.screen;
        if (position.x >= 0 && position.x <= 1) {
            position.x *= screen.width;
        }

        if (position.y >= 0 && position.y <= 1) {
            position.y *= screen.height;
        }

        return position;
    }

    filter_size(size: Size2D): Size2D {
        const screen = this.bounds || this.app.screen;

        if (size.width >= 0 && size.width <= 1) {
            size.width *= screen.width;
        }

        if (size.height >= 0 && size.height <= 1) {
            size.height *= screen.height;
        }

        return size;
    }

    filter_offset(offset: Vector2D): Vector2D {

        const screen = this.bounds || this.app.screen;

        if (offset.x >= 0 && offset.x <= 1) {
            offset.x *= screen.width;
        }

        if (offset.y >= 0 && offset.y <= 1) {
            offset.y *= screen.height;
        }

        return offset;
    }

    filter_style(style: UiOptions): UiOptions {
        if (style.fill) {
            style.fill = hex2base(String(style.fill));
        }

        if (style.line) {
            style.line.color = hex2base(String(style.line.color));
            style.line.width = style.line.width || 1;
            style.line.alpha = style.line.alpha || 1;
        }

        if (undefined === style.alpha) {
            style.alpha = 1;
        }
        
        return style;
    }

    filter_line(line: LineStyle): LineStyle {
        const screen = this.bounds || this.app.screen;
        if (line.color) {
            line.color = hex2base(String(line.color));
        }

        const width = Math.min(screen.width, screen.height);
        line.width = line.width ? (line.width * width) : 1;
        line.alpha = line.alpha || 1;

        return line;
    }

    filter_padding(padding: NumberOr<Vector2D>): Vector2D {
        if (typeof padding === 'number') {
            padding = this.filter_position({
                x: padding,
                y: padding 
            });
        }

        return padding;
    }

    filter_margin(margin: NumberOr<Vector2D>): Vector2D {
        if (typeof margin === 'number') {
            margin = this.filter_position({
                x: margin,
                y: margin 
            });
        }

        return margin;
    }

    filter_radius(radius: number): number {
        if (radius >= 0 && radius <= 1) {
            const screen = this.bounds || this.app.screen;
            const min = Math.min(screen.width, screen.height);
            return radius * min;
        }
        return radius;
    }
    
    t<R = string>(key: string, def: string = ''): R {
        return this.i18n.get(key, def);  
    }

    translate<R = string>(key: string, def: string = ''): R {
        return this.i18n.get(key, def);
    }
}

export default UI;