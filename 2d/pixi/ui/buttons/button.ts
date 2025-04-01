import UI from "@/core/2d/pixi/ui/ui";
import { Graphics, Text } from "pixi.js";
class Button<C = string, U = UiOptions> extends UI<U> {

    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(this.fill, 0.5);
        view.drawRect(0, 0, this.size.width, this.size.height);
        view.endFill();
        return view;
    }

    put(content: C) {
        if (typeof content === 'string') {
            this.view.removeChildren();
            this.text = this.createText(content, this.style);
            this.view.addChild(this.text);
        } else if (content instanceof Graphics) {
            this.view.addChild(content);
        }

    };

    createText(content: string, style: AnyObject): Text {
        const text = new Text(content, style);
        text.anchor.set(0.5, 0.5);
        text.position.set(this.size.width / 2, this.size.height / 2);
        return text;
    }

    setNewStyle(style: AnyObject) {
        if (this.text) {
            this.text.style = { ...this.text.style, ...style };
        }
    }
    
}

export default Button;