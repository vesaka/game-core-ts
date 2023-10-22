import Container from "@/core/container";
import { DisplayObject } from "pixi.js";
import { Body } from "matter-js";
import { PixiMatterModel } from "./interfaces.pm";
class Model extends Container implements ModelInterface {
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