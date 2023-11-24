import UI from "@/core/2d/pixi/ui/ui";
import { Container, EventMode } from "pixi.js";
import Button from "./button";
import Label from "./label";

class Screen extends UI {
    
    protected view: Container;

    protected layers: { [key: string]: Container } = {};

    protected buttons: { [key: string]: Button } = {};

    protected labels: { [key: string]: Label } = {};

    protected models?: CollectionInterface;

    constructor(options: AnyObject = {}) {
        super(options);
        
        this.view = new Container();
        this.scene.addChild(this.view);
    }

    get active(): boolean {
        return this.view.visible;
    }

    build() {}

    destroy() {}

    show(mode: EventMode = 'auto') {        
        this.view.eventMode = mode;
        this.view.visible = true;
        this.$emit('screen_shown', this);
    }

    hide(mode: EventMode = 'none') {
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

    loadModel(key: string) {
        
    }

    addChild() {

    }

    


}

export default Screen;