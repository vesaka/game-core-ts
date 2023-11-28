import Container from "@/core/container";
import { DisplayObject } from "pixi.js";
import { Body, Composite } from "matter-js";
import { snakeCase } from "@/core/utils/string.util";
import { hex2dec, colorToHex } from "@/core/utils/colors.util";
import { between } from "@/core/utils/math.util";

const ARRAY_ATTRIBUTES = ['axes', 'vertices', 'parts', ];

class Model extends Container implements ModelInterface {

    protected _name: string = 'model';

    constructor(options: ModelOptions) {
        super();

        this._name = snakeCase(this.constructor.name);
        
        this.applyFilters(options);
        this.model = this.createModel();
        this.body = this.createBody();
       
        this.game_ready();
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
        
        for (const key of ['width', 'height']) {
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

    createBody(): Body | Composite {
        throw new Error("Method not implemented.");
    }
    createModel(): DisplayObject {
        throw new Error("Method not implemented.");
    }
    createMaterial() {
        throw new Error("Method not implemented.");
    } 

    game_ready() {
        this.$listen({
            'game': ['render']
        });
    }

    setX(x: number): this {
        Body.setPosition(this.body, { x, y: this.body.position.y });
        this.model.x = x;
        return this;
    }

    setY(y: number): this {
        Body.setPosition(this.body, { x: this.body.position.x, y });
        this.model.y = y;
        return this;
    }

    increaseX(x: number): this {
        Body.setPosition(this.body, { x: this.body.position.x + x, y: this.body.position.y });
        this.model.x += x;
        return this;
    }

    increaseY(y: number): this {
        Body.setPosition(this.body, { x: this.body.position.x, y: this.body.position.y + y });
        this.model.y += y;
        return this;
    }

    rotate(angle: number) {
        Body.setAngle(this.body, angle);
        this.model.rotation = angle;
        return this;
    }

    setAngle(angle: number): this {
        this.body.angle = angle;
        this.model.angle = angle;
        return this;
    }

    update(): this {
        this.model.rotation = this.body.angle;
        this.updatePosition();
        return this;
    }

    updatePosition(): this {
        this.model.position.x = this.body.position.x;
        this.model.position.y = this.body.position.y;
        return this;
    }

    updateRotation(): this {
        this.model.angle = this.body.angle;
        return this;
    }

    filter_matter(body = {}) {
        const matter: any = Object.assign({}, body);
        if (typeof matter === 'object') {
            let key: keyof any;
            for (key in matter) {
                if (ARRAY_ATTRIBUTES.includes(key)) {
                    continue;
                }

                if (Array.isArray(matter[key]) && matter[key].length === 2) {
                    matter[key] = between(matter[key][0], matter[key][1]);
                }
            }
        }

        return matter;
    }

    game_render() {
        this.update();
    }



}

export default Model;