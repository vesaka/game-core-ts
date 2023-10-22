import { Graphics } from "pixi.js";
import { Body } from "matter-js";


export interface PixiMatterModel extends ModelInterface {
    model: Graphics;
    body: Body
}

export interface PixiMatterGroup {
    components: {
        [key: string]: PixiMatterModel
    },
    constraints: any
}