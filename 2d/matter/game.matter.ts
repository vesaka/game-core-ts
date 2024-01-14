import Game2D from '@/core/game';
import { Engine, Runner, Composite, World, Render, Events } from 'matter-js';
import { extend } from '@/core/utils/object.util';
import ModelMatter from './model.matter';

class GameMatter extends Game2D {

    constructor(options: GameOptions) {
        super(options);
    }

    async loadAssets(): Promise<any> {
        return this; 
    }

    add(object: ModelMatter, layer?: string | undefined): void {
        if (typeof layer === 'string') {   
            if (!this.layers[layer]) {
                this.layers[layer] = Composite.create({});
            }
            Composite.add(this.layers[layer], object.body);
            return;
        }
        Composite.add(this.world, object.body);
    }

    remove(object: ModelMatter, layer?: string | undefined): void {
        if (typeof layer === 'string') {
            if (!this.layers[layer]) {
                return;
            }
            Composite.remove(this.layers[layer], object.body); 
            return;
        }
        Composite.remove(this.world, object.body); 
    }

    load(): this {
        return this;
    }

    run(): void {
        Composite.clear(this.world, false, true);
        Engine.clear(this.engine); 
        Runner.stop(this.runner);

        Events.on(this.runner, 'tick', (event: any) => {
            this.$emit('game_render', event);
        })
        Runner.run(this.runner, this.engine);  
    }

    createApplication(): this {
        const { size, view, engine } = this.options.world;
        this.$set('engine', Engine.create({
            world: Composite.create(engine || {}) as World,
            gravity: engine.gravity || { x: 0, y: 0 }
        }));

        

        if (!this.runner) {
            this.$set('runner', Runner.create({
                isFixed: true,
                enabled: false
            }));
        }

        const render = Render.create({
            element: this.container, 
            engine: this.engine,
            options: extend(view, size) 
        });

        

        Render.run(render);
        Render.lookAt(render, {
            position: { x: 0, y: 0 },
            bounds: {
                min: { x: 0, y: 0 },
                max: { x: size.width, y: size.height }
            }
        }); 

        this.$set('app', render);
        this.$listen({
            model: ['created', 'destroyed']
        });
        return this;
    }

    createModels(): this { 
        return this;
    }

    createUi(): this {
        return this;
    }

    createEngine(): this {
        return this;
    }

    createWorld(): this {
        this.$set('world', this.engine.world);
        return this;
    }

    destroy() {
        const { app, runner } = this;
        Runner.stop(runner);
        Composite.clear(this.world, false, true);
        Engine.clear(this.engine);  
        Render.stop(app);

        app.canvas.remove();
        app.canvas = null; 
        app.context = null;  
        app.textures = {};
 
        this.render = null; 
        this.$clear();
    }

    model_created(model: ModelMatter, layer?: string) {
        this.add(model, layer);   
    }


}

export default GameMatter;