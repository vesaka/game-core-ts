import Game from '@/core/game';
import {WebGLRenderer, Scene, PerspectiveCamera, Camera } from 'three';
import { World, NaiveBroadphase, MaterialOptions, ContactMaterial, Solver, GSSolver, SplitSolver, Material, Broadphase } from 'cannon-es';
import Loader from '@/core/3d/three/loader';
import Collection from '@/core/lib/collection';

class GameThreeCannon<T = GameOptions> extends Game<T> {
    
    protected loders: ObjectWith<any> = {};

    constructor(options: GameOptions) {
        super(options);
        this.$listen({
            loader: ['load', 'completed'],
            window: ['resize'],
            game: ['init', 'ready', 'destroy', 'start', 'over', 'reset'],
            scene: ['created', 'ready'],
            camera: ['created', 'ready'],
            collection: ['ready', 'updated', 'deleted'],
        });
        
        this.running = true;
        this.animationID = undefined;
        this.$emit('game_ready');      
    }

    createApplication(): this {
        const { container } = this;
        let canvas = container.querySelector('canvas');

        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);
        }

        this.$set('world', this.createWorld());
        this.$set('scene', new Scene);

        const $renderer = this.options.renderer || {};
        $renderer.canvas = canvas;
        this.animationID = undefined;

        this.camera = this.createCamera();
        this.$set('renderer', new WebGLRenderer($renderer), true);
        this.renderer.setClearColor($renderer.color || 0x000000, $renderer.opacity || 1);
        return this; 
    }

    createCamera(): Camera {
        const { width, height } = this;
        const { fov, near, far, position } = this.options.camera;
        this.camera = new PerspectiveCamera(fov, width / height, near, far);
        this.camera.position.copy(position);
        return this.camera;
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

    createBroadphase(): Broadphase {
        return new NaiveBroadphase();
    }

    createWorld(): this {
        const world = new World();
        const { gravity } = this.options.world;

        world.gravity.set(
            gravity.x,
            gravity.y,
            gravity.z
        );

        world.broadphase = this.createBroadphase();
        world.solver =  this.createSolver();
        world.addContactMaterial(this.createContactMaterial());
        this.$set('world', world);

        return this;
    }

    createSolver(): Solver {
        const solver = new GSSolver();
        solver.iterations = 0.7;
        solver.tolerance = 0.1;
        return new SplitSolver(solver);
    }

    createContactMaterial(): ContactMaterial {
        const material = new Material('default');
        return new ContactMaterial(material, material, this.options.physics);
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
        this.renderer?.clear();
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

    collection_ready(collection: Collection) {
        collection.each((item: Model3DInterface) => {
            this.add(item);
        });
    }
    
};

export default GameThreeCannon;