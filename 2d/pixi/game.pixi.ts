import Game2D from '@/core/game';
import { Application, Container as PixiContainer } from 'pixi.js';
import PixiLoader from './loader.pixi';

class GamePixi extends Game2D {

    run(): void {
        
    }

    load() {
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
        await this.loader.load();
    }

    createProviders(): this {
        return this;
    }
    
    createModels() {
        return this;
    }

    createI18n() {
        return this;
    }

    createUi() {
        return this;
    }

    createWorld(): this {
        return this;
    }
    add(object: ModelInterface, layer?: string | undefined): void {
        if (typeof layer === 'string') {
            if (!this.layers[layer]) {
                this.layers[layer] = new PixiContainer;
                this.scene.addChild(this.layers[layer]);
            }
            this.layers[layer].addChild(object.model);
        } else {
            this.scene.addChild(object.model);
        }
    }
    remove(object: ModelInterface, layer?: string | undefined): void {
        if (typeof layer === 'string' && this.layers[layer]) {
            this.layers[layer].removeChild(object.model);
        } else {
            this.scene.removeChild(object.model);
        }
    }
}

export default GamePixi;