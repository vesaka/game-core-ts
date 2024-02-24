import UI from "@/core/2d/pixi/ui/ui";
import { Graphics } from "pixi.js";

class Label extends UI<UiOptions> {
    
    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(this.style);
        return new Graphics();
    }
}

export default Label;