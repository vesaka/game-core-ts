interface LoaderInterface {
    load(): void;
    preload(): void;
    loadAsset(name: string, url: string, type?: string|null): void;
}