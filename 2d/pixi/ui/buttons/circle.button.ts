import Button from "@/core/2d/pixi/ui/buttons/button";
import { Graphics, Text, Circle } from "pixi.js";

class CircleButton<C extends string> extends Button<C, UiOptions> {

    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(this.fill);
        view.drawCircle(0, 0, this.radius);
        view.lineStyle(this.line.width, this.line.color, this.line.alpha);
        view.endFill();
        
        
        view.eventMode = 'static';
        view.cursor = 'pointer';
        
        // view.pivot.set(this.radius, this.radius);
        view.position.set(this.position.x, this.position.y);
        const ar = this.app.screen.height / this.app.screen.width;
        view.hitArea = new Circle(-this.radius*2*ar, 0, this.radius);
        return view;
    }

    put(content: C): void {
        this.view.removeChildren();
        const text = new Text(content, this.style);
        this.view.addChild(text);
        text.anchor.set(0.5, 0.5);
        text.position.set(0, 0);
    }

}

export default CircleButton;