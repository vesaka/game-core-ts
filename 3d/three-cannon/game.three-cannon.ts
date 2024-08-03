import Game from '@/core/game';
import {WebGLRenderer, Scene} from 'three';
import { Body, Vec3 } from 'cannon-es';
import Loader from '@/core/3d/three/loader';
class GameThreeCannon<T = GameOptions> extends Game<T> {
    
    protected loders: ObjectWith<any> = {};
    constructor(options: GameOptions) {
        super(options);
        this.$listen({
            loader: ['load', 'completed'],
            window: ['resize'],
            game: ['init', 'ready', 'destroy', 'start', 'over', 'reset'],
            scene: ['created', 'ready'],
            renderer: ['created', 'ready'],
            camera: ['created', 'ready']
        });
        const {canvas} = this;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.running = true;
        
        this.$set('scene', new Scene);
        this.$emit('scene_created', this.scene);
        
        const $renderer = this.options.renderer || {};
        $renderer.canvas = canvas;

        this.animationID = undefined;
        this.$set('renderer', new WebGLRenderer($renderer));
        
        this.$emit('renderer_created', this.renderer);
        this.$emit('game_init');
                
    }

    createApplication(): this {
        return this;    
    }

    createUi(): this {
        return this;
    }

    createI18n(): this {
        return this;
    }

    createModels(): this {
        return this;
    }

    createSystems(): this {
        return this;
    }

    createWorld(): this {
        return this;
    }

    loadAssets(): Promise<any> {
        return Promise.resolve();
    }

    run(): void {
        
    }
    
    add(object: Model3DInterface): void {
        this.world.addBody(object.body);
        this.scene.add(object.model);
    }
    
    remove(object: Model3DInterface): void {
        this.world.removeBody(object.body);
        this.scene.remove(object.model);
    }
    
    load(): this {
        this.loader = new Loader(this.loaders);
        this.loader.load();
        return this;
    }
    
    destroy() {
        this.$clear();
        if (this.animationID) {
            cancelAnimationFrame(this.animationID);
            this.animationID = undefined;
        }
        this.renderer.clear();
        this.$emit('game_destroy');
        
    }
    
    loader_completed() {
        this.build();
    }
    
    window_resize() {
        
    }
    getKeyCharCode(e: KeyboardEvent): number {
        return e.key.charCodeAt(0);
    }
    
};

export default GameThreeCannon;