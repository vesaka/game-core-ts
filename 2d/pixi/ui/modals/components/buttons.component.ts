import Component from "@/core/2d/pixi/ui/component";
import { Graphics } from "pixi.js";
import ModalButton from "@/core/2d/pixi/ui/buttons/modal.button";
import { extend } from "@/core/utils/object.util";

class ButtonsComponent<B = ModalButton<string>, T = ModelCollection> extends Component<T> {
    
    buttons: {[key: string]: B} = {};

    constructor(options: T, bounds?: Size2D) {
        super(options, bounds);
    }

    createView(): Graphics {
        return new Graphics();
    }

    createButtons(callbacks: {[key: string]: Function}) {
        const { def, types } = this;
        
        let maxHeight = 0, totalWidth = 0;
        
        for (let type in types) {
            const options = extend(def, types[type]) as UiOptions;
            if (options.size.height > maxHeight) {
                maxHeight = options.size.height;
            }

            totalWidth += options.size.width;

            options.key = type;
            const button = new ModalButton<string>(options, this.size);
            button.put(type as string);
            this.buttons[type] = button as B;

            if (callbacks[type]) {
                button.view.on('pointerup', () => {
                    callbacks[type](button);
                })
            }
        }

        return this.buttons;

    }



}   

export default ButtonsComponent;