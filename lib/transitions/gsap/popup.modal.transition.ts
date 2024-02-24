import { Graphics } from "pixi.js";
import ModalTransition from "./modal.transition";
import gsap from "gsap";
class PopupModalTransition<T extends gsap.TweenTarget & Graphics, P = AnyObject> extends ModalTransition<T, P> {

    screen: Size2D;

    constructor(target: T, settings: P, screen: Size2D) {
        super(target, settings);
        this.screen = screen;
    }

    in(): Promise<void> {
        const { settings, target, screen } = this;
        target.visible = true;
        return new Promise((onComplete) => {
            gsap.fromTo(target.scale, { x: 0, y: 0 }, { x: 1, y: 1, ...settings });
            gsap.fromTo(target.position, {
                 x: screen.width * 0.5,
                 y: screen.height * 0.5
            }, { 
                x: 0,
                y: 0,
                ...settings,
                onComplete
            });
        });
    }

    out(): Promise<void> {
        const { settings, target, screen } = this;
        return new Promise((onComplete) => {
            gsap.fromTo(target.scale, { x: 1, y: 1 }, { x: 0, y: 0, ...settings });
            gsap.fromTo(target.position, {
                x: 0,
                y: 0
            }, {
                x: screen.width * 0.5,
                y: screen.height * 0.5,
                ...settings,
                onComplete
            });

        });
    }
}

export default PopupModalTransition;