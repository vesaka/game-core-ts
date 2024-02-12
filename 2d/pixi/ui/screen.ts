import UI from "@/core/2d/pixi/ui/ui";
import { Container, EventMode } from "pixi.js";
import Button from "./button";
import Label from "./label";
import { camelCase } from "@/core/utils/string.util";

abstract class Screen extends UI {
    
    protected view: Container;

    protected layers: KeyAttributeConfig<Container> = {};

    protected buttons: KeyAttributeConfig<Button> = {};

    protected labels: KeyAttributeConfig<Label> = {};

    protected models?: CollectionInterface;

    constructor(options: AnyObject = {}) {
        super(options);
        
        this.view = new Container();
        this.view.name = this.name;
        this.scene.addChild(this.view);

        this.$listen({
            screen: ['show', 'shown', 'hide', 'hidden', 'change', 'back', 'forward']
        })
 
    }

    get active(): boolean {
        return this.view.visible && this.view.eventMode !== 'none';
    }

    build() {}

    destroy() {}

    show(mode: EventMode = 'static') {
        this.$emit('screen_show', this);
        this.i18n.load(this.getKey());
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