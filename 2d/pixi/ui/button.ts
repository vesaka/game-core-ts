import UI from "@/core/2d/pixi/ui/ui";
import { DisplayObject } from "pixi.js";

abstract class Button extends UI {
    
    view?: DisplayObject;

    setView(view: DisplayObject) {
        this.view = view;
    }
}

export default Button;