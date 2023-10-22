interface StoreInterface {
    get(key: string): any;
    set(key: string, value: any): void;
    remove(key: string): void;
    clear(): void;
    reset(): void;
    commit(method: string, ...args: any[]): void;
}

export default StoreInterface;