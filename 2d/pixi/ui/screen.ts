import UI from "@/core/2d/pixi/ui/ui";
import { Container, EventMode } from "pixi.js";
import Button from "./button";
import Label from "./label";

abstract class Screen extends UI {
    
    protected view: Container;

    protected layers: KeyAttributeConfig<Container> = {};

    protected buttons: KeyAttributeConfig<Button> = {};

    protected labels: KeyAttributeConfig<Label> = {};

    protected models?: CollectionInterface;

    constructor(options: AnyObject = {}) {
        super(options);
        
        this.view = new Container();
        this.scene.addChild(this.view);

        this.$listen({
            screen: ['show', 'shown', 'hide', 'hidden']
        })
    }

    get active(): boolean {
        return this.view.visible && this.view.eventMode !== 'none';
    }

    build() {}

    destroy() {}

    show(mode: EventMode = 'auto') {
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

    screen_show(screen: Screen) {
        if (screen !== this) {
            this.hide();
        }
    }


}

export default Screen;