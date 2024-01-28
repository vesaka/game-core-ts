import Game2D from '@/core/game';
import { Application, Container as PixiContainer } from 'pixi.js';
import { Engine, Runner, Composite, World } from 'matter-js';
import { PixiMatterModel } from './interfaces.pm';
import PixiLoader from './loader.pixi';
import Screen from './screen.pixi-matter';


class GamePixiMatter extends Game2D {

    loaded: boolean = false;

    screen?: Screen;

    constructor(options: GameOptions) {
        super(options);

       
    }

    load(): this {
        if (this.didLoad) {
            return this;
        }

        return this;
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
        this.$listen({
            model: ['created', 'destroyed']
        });
        return this;
    }

    async loadAssets() {
        await this.loader.load()
    }

    createProviders(): this {
        return this;
    }
    
    createModels(): this {
        return this;
    }

    createI18n(): this {
        return this;
    }

    createUi(): this {
        return this;
    }

    run(): void {
        this.screen?.run();
    }

    onResize(): void {

    }
    
    createWorld(): this {
        const { world } = this.options;
        this.$set('engine', Engine.create({
            world: Composite.create(world.engine || {}) as World,
            gravity: world.engine.gravity || { x: 0, y: 0 }
        }));

        if (!this.runner) {
            this.$set('runner', Runner.create());
        }

        this.$set('world', this.engine.world);
        return this;
    }

    destroy(): void {
        this.$clear();
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

    model_created(model: PixiMatterModel, layer = undefined): void {
        this.add(model, layer);
    }
}

export default GamePixiMatter;