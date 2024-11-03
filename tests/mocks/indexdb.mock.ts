export const storage = new Map<string, Map<string, any>>();

export const seed = (name: string, data: Object) => {
    storage.set(name, new Map(Object.entries(data)));
}

class IndexedDBMock<T = AnyObject> {
    protected store: Map<string, T>;
    protected name: string;
    protected version: number;

    static storage = new Map<string, Map<string, any>>();

    constructor(options: { name: string, version: number }) {
        if (!IndexedDBMock.storage.has(options.name)) {
            IndexedDBMock.storage.set(options.name, new Map<string, T>());
        }
        this.store = IndexedDBMock.storage.get(options.name) as Map<string, T>;
        this.name = options.name;
        this.version = options.version;
    }

    async getItem(key: string): Promise<any> {
        return this.store.get(key) || null;
    }

    async setItem(key: string, value: any): Promise<void> {
        console.log('setting', key, value);
        this.store.set(key, value);
        return value;
    }

    async iterate(callback: (key: string, value: any) => void): Promise<void> {
        for (const [key, value] of this.store.entries()) {
            callback(key, value);
        }
    }

    async clear(): Promise<void> {
        this.store.clear();
    }

    static seed(name: string, data: AnyObject) {
        if (!IndexedDBMock.storage) {
            IndexedDBMock.storage = new Map();
        }
        IndexedDBMock.storage.set(name, new Map(Object.entries(data)));

    }
}

export default IndexedDBMock;