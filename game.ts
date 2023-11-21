import { PixiMatterGroup } from "./2d/pixi-matter/interfaces.pm";
import Container from "./container";

abstract class Game extends Container {
    
    protected loaded: boolean;

    container: HTMLElement;

    constructor(options: GameOptions) {
        super();
        Object.assign(Container.prototype, options);
        this.container = options.container;
        this.loaded = false;

        window.addEventListener('orientationchange', this.onResize.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));

        this.createApplication()
            .createWorld()
            .createUi()
            .loadAssets();

        this.$listen({
            'game': ['loaded', 'ready', 'destroy']
        })

    }

    abstract createApplication(): this;

    abstract createWorld(): this;

    abstract createModels(): this;

    abstract createUi(): this;

    abstract loadAssets(): Promise<any>;

    abstract add(object: ModelInterface, layer?: string): void;

    abstract remove(object: ModelInterface, layer?: string): void;

    abstract addGroup(group: PixiMatterGroup, layer?: string): void;

    abstract removeGroup(group: PixiMatterGroup, layer?: string): void;

    abstract load(): this;

    game_destroy(): void {
        window.removeEventListener('orientationchange', this.onResize.bind(this));
        window.removeEventListener('resize', this.onResize.bind(this));
        this.game.destroy();
    }

    protected onResize(): void {
        this.$emit('window_resize', this);
    }

}

export default Game;