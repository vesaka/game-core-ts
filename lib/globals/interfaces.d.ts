declare interface GameInterface {
    loaded: boolean = false;
    createApplication(): this;
    createWorld(): this;
    createModels(): this;
    createAssets(): this;
    addWindowEvents?(): this;
    add(object: ModelInterface, layer?: string): void;
    remove(object: ModelInterface, layer?: string): void;
    load(): this;
    onResize(): void;
    destroy(): void;
    $emit(event: string, ...args: any[]): void;
}

declare interface Game2DInterface extends GameInterface {
    add(object: Model2DInterface, layer?: string): void;
    remove(object: Model2DInterface, layer?: string): void;
}

declare interface Game3DInterface extends GameInterface {
    add(object: Model3DInterface, layer?: string): void;
    remove(object: Model3DInterface, layer?: string): void;
}

declare interface ModelInterface {
    protected model?: any;
}

declare interface Model2DInterface extends ModelInterface {
    protected model: any;
}

declare interface Model3DInterface extends ModelInterface {

}

declare interface CollectionInterface<T> {
    all(): T[];
    count(condition?: ArrayFilterCallback): number;
    avarage(key: string | number): number;
    avg(key: string | number): number;
    add(item: any): this;
    get(key: number): T;
    remove(at: number): this;
    find(condition: Function): any;
    first(condition: Function): any;
    create(...names: string[]): void;
    destroy(...names: string[]): void;
}

declare type TransitionProps<P = Vector2D> = {
    [key: string]: [number, number] | [string, string] | [P, P]
}

declare interface TransitionInterface<T = any, P = AnyObject>  {
    target: T;
    settings: P;
    in: Promise
    out: Promise
}
