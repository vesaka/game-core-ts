import UI from "@/core/2d/pixi/ui/ui";
import { Container, EventMode } from "pixi.js";
import Button from "./button";
import Label from "./label";
import { camelCase } from "@/core/utils/string.util";

abstract class Screen<T = UiOptions> extends UI<T, Container> {
    
    protected layers: KeyAttributeConfig<T> = {};

    protected buttons: KeyAttributeConfig<Button> = {};

    protected labels: KeyAttributeConfig<Label> = {};

    protected models?: CollectionInterface<T>;

    protected query?: AnyObject;

    constructor(options: T = {} as T) {
        super(options);
        
        this.scene.addChild(this.view);

        this.$listen({
            screen: ['show', 'shown', 'hide', 'hidden', 'change', 'back', 'forward']
        })
 
    }

    createView(): Container {
        return new Container();
    }

    get active(): boolean {
        return this.view.visible && this.view.eventMode !== 'none';
    }

    build() {}

    destroy() {}

    show(mode: EventMode = 'static') {
        this.$emit('screen_show', this);
        this.view.eventMode = mode;
        this.view.visible = true;
        this.$emit('screen_shown', this);
    }

    hide(mode: EventMode = 'none') {
        this.$emit('screen_hide', this);
        this.view.eventMode = mode;
        this.view.visible = false;
        this.$emit('screen_hidden', this);
    }


    enable(mode: EventMode = 'auto') {
        this.view.eventMode = mode;
    }

    disable(mode: EventMode = 'none') {
        this.view.eventMode = mode;
    }

    loadModels(...keys: []) {
        for (let key of keys) {
            this.loadModel(key);
        }
    }

    addChild() {

    }

    screen_change(name: string) {
        if (name !== this.key) {
            this.hide(); 
        } else {
            this.show();
        }
    }

    screen_back() {

    }

    getKey() {
        return this.key || camelCase(this.name.replace('_screen', '').replace('_', '-'));
    }


}

export default Screen;