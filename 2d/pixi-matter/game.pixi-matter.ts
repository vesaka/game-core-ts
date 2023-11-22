import Game2D from '@/core/game';
import { Application, Container as PixiContainer } from 'pixi.js';
import { Engine, Runner, Composite } from 'matter-js';
import { PixiMatterGroup, PixiMatterModel } from './interfaces.pm';
import PixiLoader from './loader.pixi';


class GamePixiMatter extends Game2D {

    loaded: boolean = false;

    constructor(options: GameOptions) {
        super(options);

        this.$listen({
            model: ['created', 'destroyed']
        });
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
            resolution: Math.min(window.devicePixelRatio || 1, 2),
            backgroundColor: 0x101010,
        }, this.options.app));


        this.$set('app', app);
        this.$set('layers', {});
        this.$set('scene', new PixiContainer());
        this.$set('loader', new PixiLoader(this.assets));

        this.app.stage.addChild(this.scene); // Add the scene container to the app stage
        this.container?.appendChild(this.app.view);

        return this;
    }

    async loadAssets() {
        await this.loader.load()
    }
    createModels(): this {
        return this;
    }

    createUi(): this {
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

    model_created(model: PixiMatterModel, layer = undefined): void {
        this.add(model, layer);
    }
}

export default GamePixiMatter;