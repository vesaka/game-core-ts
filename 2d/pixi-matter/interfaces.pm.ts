import { Graphics } from "pixi.js";
import { Body, Composite } from "matter-js";


export interface PixiMatterModel extends ModelInterface {
    name: string;
    model: Graphics;
    body: Body
}

export interface PixiMatterGroup {
    name: string;
    model: Graphics;
    body: Composite;
}