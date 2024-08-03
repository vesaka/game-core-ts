import Container from "./container";

abstract class Game<T = GameOptions> extends Container<T> {
    
    protected loaded: boolean;

    protected paused: boolean = false;

    container: HTMLElement;

    constructor(options: GameOptions) {
        super();
        Object.assign(Container.prototype, options);
        this.container = options.container;
        this.loaded = false;

        window.addEventListener('orientationchange', this.onResize.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));

        this.createApplication()
            .createSystems()
            .createWorld()
            .createUi()
            .createI18n()
            .createModels()
            .loadAssets();

        this.$listen({
            'game': ['loaded', 'ready', 'destroy']
        })

        this.$emit('game_ready', this);

    }

    abstract createApplication(): this;

    abstract createSystems(): this;

    abstract createWorld(): this;

    abstract createModels(): this;

    abstract createUi(): this;

    abstract createI18n(): this;

    abstract loadAssets(): Promise<any>;

    abstract add(object: ModelInterface, layer?: string): void;

    abstract remove(object: ModelInterface, layer?: string): void;

    abstract load(): this;

    abstract run(): void;
    
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