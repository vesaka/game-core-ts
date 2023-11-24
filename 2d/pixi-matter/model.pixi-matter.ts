import Container from "@/core/container";
import { DisplayObject, LineStyle } from "pixi.js";
import { Body } from "matter-js";
import { snakeCase } from "@/core/utils/string.util";
import { hex2dec, colorToHex } from "@/core/utils/colors.util";

class Model extends Container implements ModelInterface {

    protected _name: string = 'model';

    constructor(options: ModelOptions) {
        super();

        this._name = snakeCase(this.constructor.name);
        
        this.applyFilters(options);
        this.body = this.createBody();
        this.model = this.createModel();
    }

    get name(): string {
        return this._name;
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

        for (let key in ['width', 'height']) {
            const attribute = key as keyof Size2D;
            if (size.hasOwnProperty(attribute) && size[attribute] >= 0 && size[attribute] <= 1) {
                size[attribute] *= screen[attribute];
            }
        }

        return size;
    }

    filter_radius(radius: number): number {
        return this.recalculate(radius);
    }

    filter_view(view: PixiGraphicsOptions): PixiGraphicsOptions {
        
        if (typeof view.color === 'string') {
            view.color = hex2dec(colorToHex(view.color as string));
        }

        if (typeof view.fill === 'string') {
            view.fill = hex2dec(colorToHex(view.fill as string));
        }

        if (view.line) {
            if (typeof view.line.color === 'string') {
                view.line.color = hex2dec(colorToHex(view.line.color as string));
            }
            
            view.line.width = this.recalculate(view.line.width);
            view.line.alpha = view.line.alpha || 1;
            
        }

        return view;
    }

    recalculate(num: number) {
        const { screen } = this.app;

        if (num >= 0 && num <= 1) {
            num *= Math.min(screen.width, screen.height);
        }

        return num;
    }

    createBody(): Body {
        throw new Error("Method not implemented.");
    }
    createModel(): DisplayObject {
        throw new Error("Method not implemented.");
    }
    createMaterial() {
        throw new Error("Method not implemented.");
    } 

}

export default Model;