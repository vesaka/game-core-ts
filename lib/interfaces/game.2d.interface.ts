import Model2DInterface from "./model.2d.interface";

interface Game2DInterface {
    didLoad: boolean;
    load(): void;
    loader_complete(): void;
    createWorld(): void;
    destroy(): void;
    add(object: Model2DInterface, layer?: string | null): void;
    remove(object: Model2DInterface, layer?: string | null): void;

}

export default Game2DInterface;