import Container from "@/core/container";
import { DisplayObject } from "pixi.js";
import { Body } from "matter-js";
import { snakeCase } from "@/core/utils/string.util";

class Model extends Container implements ModelInterface {

    protected _name: string = 'model';

    constructor(options: ModelOptions) {
        super();

        this._name = snakeCase(this.constructor.name);
        
        this.applyFilters(options);
    }

    get name(): string {
        return this._name;
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