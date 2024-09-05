import UI from "../ui";
import { Graphics, Text } from "pixi.js";

class Scroller<T extends ScrollerOptions> extends UI<T> {

    protected thumb: Graphics;

    protected track: Graphics;

    constructor(options: T) {
        super(options);

        this.thumb = this.createThumb();
        this.track = this.createTrack();
        this.track.addChild(this.thumb);

        this.view.addChild(new Text('Scroller'));
        this.view.position.set(0, 0);
    }

    createView(): Graphics {
        const view = new Graphics();
        view.beginFill(0xFF8888, 0.5);
        view.drawRect(0, 0, this.size.width, this.size.height);
        view.endFill();
        return view;
    }

    createThumb(): Graphics {
        const thumb = new Graphics();
        thumb.beginFill(0x000000, 0.5);
        thumb.drawRect(0, 0, 10, 10);
        thumb.endFill();
        return thumb;
    }

    createTrack(): Graphics {
        const track = new Graphics();
        track.beginFill(0x000000, 0.5);
        track.drawRect(0, 0, 10, 10);
        track.endFill();
        return track;
    }

    createArrows() {

    }
}

export default Scroller;