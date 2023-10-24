import UI from "@/core/2d/pixi/ui/ui";
import { Sprite } from "pixi.js";
class Button extends UI {
    
    view?: Sprite;

    setView(view: Sprite) {
        this.view = view;
    }
}

export default Button;