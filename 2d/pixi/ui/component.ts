import UI from "@/core/2d/pixi/ui/ui";

import { Graphics, Text } from "pixi.js";

class Component<T = UiOptions> extends UI<T, Graphics> {

    
    constructor(options: T, bounds?: Size2D) {
        super(options, bounds);
        this.view.name = this.name;
    }

    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(this.fill, this.alpha);
        view.drawRect(0, 0, this.size.width, this.size.height);
        view.endFill();
        return view;
    }

    updateText(message: string) {
        const text = new Text(message, this.style);
        text.position.set(this.size.width * 0.5, this.size.height * 0.5);
        text.anchor.set(0.5);
        this.view.addChild(text);
    }

    
}

export default Component;