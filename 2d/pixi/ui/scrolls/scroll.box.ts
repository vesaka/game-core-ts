import Component from "@/core/2d/pixi/ui/component";

import { Graphics, FederatedPointerEvent, DisplayObject } from "pixi.js";

class ScrollBox<T = ScrollerOptions> extends Component<T> {

    vBar?: Graphics;

    hBar?: Graphics;

    constructor(options: T, bounds?: Size2D) {
        super(options, bounds);
        this.disabled = false;
        this.view.position.set(this.position.x, this.position.y);
        this.view.visible = false;
        this.content = new Graphics();
        this.area = new Graphics();
        this.box = this.getBox();
    }

    createView(): Graphics {
        return new Graphics();
    }

    createArea(options: AnyObject) {
        const area = new Graphics();
        area.beginFill(0x000000, 0);
        area.drawRect(
            0,
            0,
            options.width,
            options.height
        );
        area.position.set(options.x, options.y);
        area.endFill();
        return area;
    }

    createMask(options: AnyObject) {
        const mask = new Graphics();
        mask.beginFill(0x000000, 1);
        mask.drawRect(
            0,
            0,
            options.width,
            options.height
        );
        mask.position.set(options.x, options.y);
        mask.endFill();

        return mask;
    }

    createScroll(options: AnyObject) {
        const scroll = new Graphics();
        scroll.beginFill(0x000000, 0.5);
        scroll.drawRect(
            0,
            0,
            options.width,
            options.height
        );
        scroll.position.set(options.x, options.y);
        scroll.endFill();
        const track = this.createTrack(options);
        scroll.addChild(track);
        if (this.scroll.arrows) {
            const thumb = track.children[0] as Graphics;
            const startArrow = this.createArrow('start', options, thumb);
            scroll.addChild(startArrow);
            const endArrow = this.createArrow('end', options, thumb);
            scroll.addChild(endArrow);
        }
        return scroll;
    }

    getBox() {

        const { scroll, size, position, content } = this;
        const box: AnyObject = {
            x: position.x,
            y: position.y,
            width: size.width,
            height: size.height,
            content: {
                x: 0,
                y: 0,
            },
            area: {
                x: 0,
                y: 0,
                width: content.width,
                height: content.height
            },
            mask: {
                x: 0,
                y: 0,
                width: size.width,
                height: size.height
            }
        }
        if (content.height > size.height) {

            box.width -= scroll.volume;
            box.area.width += scroll.volume;
            box.mask.width -= scroll.volume;
            box.vertical = {
                x: box.width - scroll.volume,
                y: 0,
                width: scroll.volume,
                height: box.height,
                axis1: 'y',
                axis2: 'x',
                side1: 'height',
                side2: 'width'
            };
            if (['right', true, undefined].includes(scroll.vertical)) {
                box.x = position.x;
            } else if ('left' === scroll.vertical) {
                box.x = scroll.volume;
                box.content.x = position.x;
                box.vertical.x = 0;
            }
        }

        if (content.width > size.width) {
            box.height -= scroll.volume;
            box.area.height += scroll.volume;
            box.mask.height -= scroll.volume;
            box.horizontal = {
                x: 0,
                y: box.height - scroll.volume,
                width: box.width,
                height: scroll.volume,
                axis1: 'x',
                axis2: 'y',
                side1: 'width',
                side2: 'height'
            };
            if ('top' === scroll.horizontal) {
                box.y = scroll.volume;
                box.mask.y = scroll.volume;
                box.content.y = scroll.volume;
            } else if (['bottom', true, undefined].includes(scroll.horizontal)) {
                box.y = -scroll.volume;
                box.horizontal.y = size.height - scroll.volume;
            }
        }

        return box;
    }

    createThumb(options: AnyObject) {
        const { area, mask } = this;

        const box: AnyObject = {};
        box[options.side1] = options[options.side1] * mask[options.side1] / area[options.side1];
        box[options.side2] = options[options.side2];

        const thumb = new Graphics();
        thumb.beginFill(0x336633, 1);
        thumb.drawRect(0, 0, box.width, box.height);
        thumb.endFill();
        thumb.position.set(0, 0);

        thumb.eventMode = 'static';
        this.activeThumb = thumb;
        thumb.on('pointerdown', (ev: FederatedPointerEvent) => this.onGrab(ev, thumb));
        this.scene.on('pointermove', (ev: FederatedPointerEvent) => this.onDrag(ev, thumb, options));
        this.scene.on('pointerup', () => this.onRelease());
        thumb.name = 'thumb';
        return thumb;
    }

    onGrab(event: any, thumb: Graphics) {
        this.scene.eventMode = 'static';
        const data = event.data;
        const point = data.getLocalPosition(thumb.parent);
        this.dragPoint = point;
    }

    onDrag(event: FederatedPointerEvent, thumb: Graphics, options: AnyObject) {
        if (this.dragPoint) {
            console.log('dragging', event.data);
            this.updateScrollPosition(event.data.getLocalPosition(thumb.parent), thumb, options);
        }
    }

    onRelease() {
        this.scene.eventMode = 'dynamic';
        this.dragPoint = null;
    }

    updateScrollPosition(point: Vector2D, thumb: Graphics, options: AnyObject) {
        const side: keyof DisplayObject = options.side1 as keyof DisplayObject;
        const parentSize: number = thumb.parent[side] as number;
        const axis: keyof Vector2D = options.axis1;
        if (point[axis] < 0 || point[axis] > parentSize) {
            return;
        }
        const delta: number = (point[axis] - this.dragPoint[axis]);
        const size: number = thumb[side] as number;

        this.dragPoint = point;
        thumb.position[axis] = Math.max(0, Math.min(parentSize - size, thumb.position[axis] + delta));
        this.area.position[axis] = -thumb.position[axis] * (this.area[side] - this.mask[side]) / (parentSize - size);
    }

    applyScrollDelta(delta: number, thumb: Graphics, options: AnyObject) {
        const side: keyof DisplayObject = options.side1 as keyof DisplayObject;
        const parentSize: number = thumb.parent[side] as number;
        const axis: keyof Vector2D = options.axis1;
        const size: number = thumb[side] as number;
        console.log('parent size', parentSize - size);
        thumb.position[axis] = Math.max(0, Math.min(parentSize - size, thumb.position[axis] + delta));
        this.area.position[axis] = -thumb.position[axis] * (this.area[side] - this.mask[side]) / (parentSize - size);
    }

    createTrack(options: AnyObject) {
        const track = new Graphics();
        const offset = this.scroll.arrows ? this.scroll.volume : 0;
        const box: AnyObject = {
            [options.axis1]: offset,
            [options.axis2]: 0,
            [options.side1]: options[options.side1] - offset * 2,
            [options.side2]: options[options.side2]
        };

        track.beginFill(0x0055000, 0.5);
        track.drawRect(0, 0, box.width, box.height);
        track.endFill();
        track.position.set(box.x, box.y);
        const thumb = this.createThumb(options);
        track.addChild(thumb);
        return track;
    }

    createArrow(at: string, options: AnyObject, thumb: Graphics) {
        const { volume } = this.scroll;
        const axis: keyof Vector2D = options.axis1;
        const arrow = new Graphics();
        arrow.beginFill(0x888888, 0.2);
        arrow.drawRect(0, 0, volume, volume);
        arrow.endFill();
        const tri = new Graphics();
        tri.beginFill(0x888888, 0.25);
        tri.moveTo(0, 0);
        tri.lineTo(volume, 0);
        tri.lineTo(volume / 2, volume / 2);
        tri.lineTo(0, 0);
        tri.endFill();
        tri.position.set(0, 0);
        const arrowOptions = this.getArrowOptions(axis, at);
        if (at === 'start') {
            arrow.position.set(0, 0);
        } else if (at === 'end') {
            arrow.position.set(options.width - volume, options.height - volume);

        }
        tri.pivot.set(arrowOptions.pivotX, arrowOptions.pivotY);
        tri.rotation = arrowOptions.rotation;
        arrow.addChild(tri);
        arrow.eventMode = 'static';

        const scollEvent = () => {
            const delta = (at === 'start' ? -volume : volume);
            this.applyScrollDelta(delta, thumb, options);
        }

        let interval: any = null;

        arrow.on('pointerdown', () => {
            interval = setInterval(scollEvent, 100);
        });

        
        arrow.on('pointerup', () => {
            if (interval) {
                clearInterval(interval);
            }

            scollEvent();

        });
        return arrow;
    }

    updateView() {
        this.view.visible = false;
        // if (this.content) {
        //     this.content.visible = false;
        //     this.content.mask = null;
        // }

        // if (this.mask) {
        //     this.view.removeChild(this.mask);
        // }

        // if (this.vBar) {
        //     this.view.removeChild(this.vBar);
        // }

        // if (this.hBar) {
        //     this.view.removeChild(this.hBar);
        // }

        this.setup();


    }

    setup() {
        this.box = this.getBox();

        this.mask = this.createMask(this.box.mask);


        this.area = this.createArea(this.box.area);
        this.view.addChild(this.mask);
        this.content.position.set(this.box.content.x, this.box.content.y);
        this.area.mask = this.mask;
        this.area.addChild(this.content);
        this.view.addChild(this.area);

        if (this.box.vertical) {
            this.vBar = this.createScroll(this.box.vertical);
            this.view.addChild(this.vBar);
        }

        if (this.box.horizontal) {
            this.hBar = this.createScroll(this.box.horizontal);
            this.view.addChild(this.hBar);
            this.view.eventMode = 'static';
        }

        this.view.visible = true;
    }

    add(items: Graphics | Graphics[]) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                this.content.addChild(item);
            });
        } else {
            this.content.addChild(items);
        }

        this.updateView();
    }

    remove(items: Graphics | Graphics[]) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                this.content.removeChild(item);
            });
        } else {
            this.content.removeChild(items);
        }
        this.updateView();
    }

    clear() {
        this.content.removeChildren();
        this.updateView();
    }

    private getArrowOptions(axis: keyof Vector2D, at: string) {
        const { volume } = this.scroll;
        const options = {
            x: 0,
            y: 0,
            rotation: 0,
            pivotX: 0,
            pivotY: 0
        }

        if ('x' === axis && 'start' === at) {
            options.rotation = Math.PI / 2;
            options.pivotY = volume * 0.6;
        } else if ('x' === axis && 'end' === at) {
            options.rotation = - Math.PI / 2;
            options.pivotY = -volume * 0.3;
            options.pivotX = volume;
        } else if ('y' === axis && 'start' === at) {
            options.rotation = Math.PI / 2;
            options.pivotY = volume * 0.6;
        } else if ('y' === axis && 'end' === at) {
            options.rotation = -Math.PI / 2;
            options.x = volume;
            options.y = volume;
        }

        return options;

    }
}

export default ScrollBox;