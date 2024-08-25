import Component from "@/core/2d/pixi/ui/component";
import { Graphics } from "pixi.js";

class TabComponent extends Component {

    protected _active: boolean = false;

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
        this.view.visible = value;
    }

    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(0x00FF88, 0.05);
        view.drawRect(0, 0, this.size.width, this.size.height);
        view.endFill();
        view.position.set(0, 0);
        view.visible = false;
        return view;
    }
}

export default TabComponent;