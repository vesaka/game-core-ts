import Game2D from '@/core/game';
import { Application, Container as PixiContainer } from 'pixi.js';
import { Engine, Runner, Composite } from 'matter-js';
import { PixiMatterGroup, PixiMatterModel } from './interfaces.pm';
import PixiLoader from './loader.pixi';
import UI from '@/game/collections/ui.collection';

class GamePixiMatter extends Game2D {

    loaded: boolean = false;

    constructor(options: GameOptions) {
        super(options);
    }

    load(): this {
        if (this.didLoad) {
            return this;
        }

        return this;
    }
    loader_complete(): void {
        throw new Error('Method not implemented.');
    }
    createApplication(): this {
        const app = new Application(Object.assign({}, {
            width: this.options.world.size.width,
            height: this.options.world.size.height,
            //resizeTo: window,
            resolution: Math.min(window.devicePixelRatio || 1, 2)
        }, this.options.app));


        this.$set('app', app);
        this.$set('layers', {});
        this.$set('scene', new PixiContainer());


        this.container?.appendChild(this.app.view);

        return this;
    }

    async loadAssets() {
        const loader = new PixiLoader(this.assets);
        await loader.load()
    }
    createModels(): this {
        return this;
    }

    createUi(): this {
        this.layers.ui = new PixiContainer;
        this.scene.addChild(this.layers.ui);

        const uiCollection = new UI();
        uiCollection.buildItems(this.options.ui);
        this.$set('ui', uiCollection);
        return this;
    }

    onResize(): void {

    }
    createWorld(): this {
        this.$set('engine', Engine.create(this.options.engine));

        if (!this.runner) {
            this.$set('runner', Runner.create());
        }

        this.$set('world', this.engine.world);
        return this;
    }

    destroy(): void {

    }

    add(object: PixiMatterModel, layer?: string): void {
        if (typeof layer === 'string') {
            if (!this.layers[layer]) {
                this.layers[layer] = new PixiContainer;
                this.scene.addChild(this.layers[layer]);
            }
            this.layers[layer].addChild(object.model);
        } else {
            this.scene.addChild(object.model);
        }

        Composite.add(this.engine.world, object.body);
    }

    remove(object: PixiMatterModel, layer?: string): void {
        Composite.remove(this.engine.world, object.body);

        if (typeof layer === 'string' && this.layers[layer]) {
            this.layers[layer].removeChild(object.model);
        } else {
            this.scene.removeChild(object.model);
        }
    }

    addGroup(group: PixiMatterGroup, layer?: string): void {
        for (let key in group.components) {
            this.add(group.components[key], layer);
        }

        Composite.add(this.engine.world, group.constraints);
    }

    removeGroup(group: PixiMatterGroup, layer?: string): void {
        for (let key in group.components) {
            this.remove(group.components[key], layer);
        }
    }
}

export default GamePixiMatter;