import gsap from "gsap";

class ModalTransition<T extends gsap.TweenTarget, P = AnyObject> implements TransitionInterface<T, P> {

    target: T;

    settings: P;


    constructor(target: T, settings: P) {
        this.target = target;
        this.settings = settings;
    }

    in(): Promise<void> {
        const { settings, target } = this;
        return new Promise((resolve) => {
            gsap.fromTo(target, { alpha: 0 }, { alpha: 1, ...settings, onComplete: resolve });
        });
    }

    out(): Promise<void> {
        const { settings, target } = this;
        return new Promise((resolve) => {
            gsap.fromTo(target, { alpha: 1 }, { alpha: 0, ...settings, onComplete: resolve });
        });
    }
}

export default ModalTransition;