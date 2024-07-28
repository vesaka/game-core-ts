import UI from "@/core/2d/pixi/ui/ui";

import { Graphics, FederatedPointerEvent} from "pixi.js";
import ModalTransition from "@/core/lib/transitions/gsap/modal.transition";
import CircleButton from "@/core/2d/pixi/ui/buttons/circle.button";
import ModalButton from "@/core/2d/pixi/ui/buttons/modal.button";
import Component from "@/core/2d/pixi/ui/component";
import { extend } from "@/core/utils/object.util";

class Modal<H = string, B = string, O = string, C = string, X = string> extends UI<ModalOptions, Graphics> {

    _transition?: TransitionInterface<Graphics>;
    
    constructor(options: ModalOptions) {
        super(options);
        this.view.name = this.name;
        this.box = this.createBox();

        this.view.addChild(this.box);
        this.pointerIsInsideBox = false;
    }

    get transition(): TransitionInterface<Graphics> {
        if(!this._transition) {
            this._transition = new ModalTransition<Graphics>(this.view, {
                duration: 0.5,
                ease: 'power2'
            });
        }

        return this._transition;
    }

    setTransition(transition: TransitionInterface<Graphics>) {
        this._transition = transition;
    }

    filter_backdrop(backdrop: UiOptions): UiOptions {
        return this.filter_style(backdrop);
    }

    filter_header(options: UiOptions): Component {
        return new Component(options, this.size);
    }
    
    filter_body(options: UiOptions): Component {
        return new Component(options, this.size);
    }

    createView(): Graphics{
        const { app, backdrop } = this;
        const view = new Graphics();
        view.position.set(0, 0);
        view.beginFill(backdrop.fill, backdrop.alpha);
        view.drawRect(0, 0, app.screen.width, app.screen.height);
        view.endFill();
        view.eventMode = 'static';
        view.on('pointerup', () => {
            if (this.pointerIsInsideBox) return;
            this.close();
        })
        return view;
    }

    createBox() {
        const { size, style, position } = this;

        const box = new Graphics();
        box.beginFill(style.fill, style.alpha);
        box.drawRect(0, 0, size.width, size.height);
        box.endFill();
        box.position.set(position. x, position.y);
        box.pivot.set(size.width * 0.5, size.height * 0.5);
        box.eventMode = 'static';
        box.on('pointerover', () => {
            this.pointerIsInsideBox = true;
        });
        box.on('pointerout', () => {
            this.pointerIsInsideBox = false;
        });
        return box;
    }

    populate(options: ModalPromptOptions<H, B, O, C, X, FederatedPointerEvent>) {
        const { box, header, body, dismiss, buttons } = this;
        if (header) {
            const headerComponent = this.createHeader(header);
            box.addChild(headerComponent.view);
        }

        if (body) {
            body.updateText(options.body);
            box.addChild(body.view);
        }

        if (buttons) {
            const buttonList = this.createButtons(buttons, options);
            for (let type in buttonList) {
                box.addChild(buttonList[type].view);
            }
            // box.addChild(buttonsComponent.view);
        }

        if (dismiss) {
            const dismissButton = this.createDismissButton(dismiss);
            dismissButton.view.on('pointerup', () => {
                this.close();
            });
            box.addChild(dismissButton.view);
        }
    }

    createHeader(options: UiOptions): Component {
        return new Component(options, this.size);
    }

    open(options: ModalPromptOptions<H, B, O, C, X, FederatedPointerEvent>) {

        this.scene.addChild(this.view);

        return this.transition.in().then(() => {
            this.populate(options);
            this.view.visible = true;
            this.$set('modalIsOpen', true, true)
        });
    }

    close() {
        return this.transition.out().then(() => {
            this.view.visible = false;
            this.view.removeChildren();
            this.scene.removeChild(this.view);
            this.$set('modalIsOpen', false, true)
        });
    }

    in() {
        return Promise.resolve();
    }

    createButtons<S extends string>(options: ModelCollection, prompt: ModalPromptOptions<H, B, O, C, X, FederatedPointerEvent>): Array<ModalButton<S>> {
        const { def, types } = options;

        const buttons: ModalButton<S>[] = [];
        for (let type in types) {
            const button = new ModalButton<S>((extend(def, types[type] || {}) as ModalOptions), this.size);
            button.put(type as S);
            button.view.on('pointerup', (e: FederatedPointerEvent) => {
                if (prompt.callbacks.hasOwnProperty(type)) {
                    prompt.callbacks[type as keyof typeof prompt.callbacks](e);
                }
                this.close();
            });

            buttons.push(button);
        }
        return buttons;
    }

    createOkButton(options: UiOptions): ModalButton<string>{
        const ok = new ModalButton<string>(options);
        ok.put('Ok');
        return ok;        
    }


    createCancelButton(options: UiOptions): ModalButton<string>{
        const cancel = new ModalButton<string>(options);
        cancel.put('Cancel');
        return cancel;
        
    }

    createDismissButton(options: UiOptions): CircleButton<string> {
        const dissmiss = new CircleButton<string>(options, this.size);
        dissmiss.put('X');
        return dissmiss;
    }

    
}

export default Modal;