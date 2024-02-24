import UI from "@/core/2d/pixi/ui/ui";
import { Graphics } from "pixi.js";

class Layout extends UI<UiOptions, Graphics>{
    
    createView(): Graphics {
        return new Graphics();
    }
    
}

export default Layout;