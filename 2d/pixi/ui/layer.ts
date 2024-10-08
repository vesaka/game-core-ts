import Container from "@/core/container";
import { Container as PixiContainer } from "pixi.js";
import Component from "./component";
class Layer extends Container {

    protected children : Component[];
    
    constructor() {
        super();
        this.view = new PixiContainer();
        this.children = [];
    }

    add(child: Component) {
        this.view.addChild(child.view);
        this.children.push(child);
    }

    remove(child: Component) {
        this.view.removeChild(child.view);
        this.children = this.children.filter(c => c !== child)
    }

    clear() {
        this.children.forEach(child => this.view.removeChild(child.view));
        this.children = [];
    }

    destroy() {
        this.$mute();
        this.clear();
    }
    
}

export default Layer;