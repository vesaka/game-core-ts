import Button from "@/core/2d/pixi/ui/buttons/button";
import { Graphics, Text } from "pixi.js";

class ModalButton<S extends string> extends Button<S> {

    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(this.fill, 1);
        view.drawRect(0, 0, this.size.width, this.size.height);
        view.endFill();
        
        
        view.eventMode = 'static';
        view.cursor = 'pointer';
        view.position.set(this.position.x, this.position.y);
        return view;
    }

    put(content: S): void {
        this.view.removeChildren();
        const text = new Text(this.t(`app.${content}`, content), this.style);
        this.view.addChild(text);
        text.anchor.set(0.5, 0.5);
        text.position.set(this.size.width / 2, this.size.height / 2);
    }

}

export default ModalButton;