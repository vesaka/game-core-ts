import UI from "@/core/2d/pixi/ui/ui";

import { Graphics } from "pixi.js";

class Component<T = UiOptions, G = Graphics> extends UI<T, G> {

    
    constructor(options: T, bounds?: Size2D) {
        super(options, bounds);
        
    }

    createView(): G {
        const view = new Graphics();
        view.beginFill(this.fill, this.alpha);
        view.drawRect(0, 0, this.size?.width, this.size?.height);
        view.endFill();
        return view as G;
    }

    update() {
        this.view = this.createView();
    }

    build() {
        
    }
    
}

export default Component;