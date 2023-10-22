interface GameInterface {
    loaded: boolean;
    createApplication(): this;
    createWorld(): this;
    createModels(): this;
    createAssets(): this;
    load(): void;
    onResize(): void;
    destroy(): void;
}

export default GameInterface;