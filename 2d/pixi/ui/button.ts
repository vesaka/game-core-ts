import UI from "@/core/2d/pixi/ui/ui";
import { Graphics } from "pixi.js";

abstract class Button extends UI {
    
    view: Graphics;
  
    constructor(options: AnyObject) {
        super(options);
        this.view = this.createView();
    }

    setView(view: Graphics) {
        this.view = view;
    } 

    abstract createView(): Graphics;
}

export default Button;