import UI from "@/core/2d/pixi/ui/ui";
import { Graphics } from "pixi.js";

abstract class Button<V = Graphics> extends UI<UiOptions, V> {
      
    constructor(options: UiOptions) {
        super(options);
    }

}

export default Button;