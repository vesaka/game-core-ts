import Model from "@/core/2d/pixi-matter/model.pixi-matter";
import { Composite } from "matter-js";
import { DisplayObject, Graphics } from "pixi.js";

class Group extends Model {
    constructor(options: ModelOptions) {
        super(options);
    }

    createBody(): Composite {
        return Composite.create();
    }

    createModel(): DisplayObject {
        return new Graphics;
    }

    setX(x: number): this {
        this.model.position.x = x;
        Composite.translate(this.body, { x, y: 0 });
        return this;
    }

    setY(y: number): this {
        this.model.position.y = y;
        Composite.translate(this.body, { x: 0, y });
        return this;
    }

    setAngle(angle: number): this {
        Composite.rotate(this.body, angle, this.position);
        return this;
    }

    rotate(angle: number): this {
        this.model.rotation += angle;
        Composite.rotate(this.body, angle, this.position);
        return this;
    }

    update(): this {
        this.updatePosition();
        return this;
    }

    updatePosition(): this {
        const bounds = Composite.bounds(this.body);
        this.model.position.set(
            (bounds.min.x + bounds.max.x) * 0.5,
            (bounds.min.y + bounds.max.y) * 0.5
        );

        return this;
    } 
}

export default Group;