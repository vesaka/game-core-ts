import Container from "@/core/container";
import { Body } from "matter-js";
import { snakeCase } from "@/core/utils/string.util";

class ModelMatter extends Container implements ModelInterface {

    protected _name: string = 'model';

    protected active: boolean = false;

    body: Body;
    model: any;

    constructor(options: any) {
        super();
        this._name = snakeCase(this.constructor.name);
        
        this.applyFilters(options);

        this.$listen({
            model: ['active', 'inactive']
        })

        this.body = this.createBody();
        this.model = {};
    }

    filter_position(position: Vector2D): Vector2D {
        const { options } = this.app;

        if (position.x >= 0 && position.x <= 1) {
            position.x *= options.width;
        }

        if (position.y >= 0 && position.y <= 1) {
            position.y *= options.height;
        }

        return position;
    }

    filter_size(size: Size2D): Size2D {
        const { options } = this.app;
        
        for (const key of ['width', 'height']) {
            const attribute = key as keyof Size2D;
            if (size.hasOwnProperty(attribute) && size[attribute] >= 0 && size[attribute] <= 1) {
                size[attribute] *= options[attribute];
            }
        }

        return size;
    }

    filter_radius(radius: number): number {
        return this.recalculate(radius);
    }

    createBody(): Body { 
        return Body.create({});
    }
    
    createModel() { }

    createMaterial() { }

    run() {
        this.active = true;
        this.$emit('model_active', this);
    }

    recalculate(num: number): number {
        const { options } = this.app;
        if (num >= 0 && num <= 1) {
            num *= Math.min(options.width, options.height);
        }

        return num;
    }
}

export default ModelMatter;