import StoreInterface from '@/core/lib/interfaces/store.interface';
import { StoreState } from 'pinia';

class PiniaStore implements StoreInterface {
    
    protected store: StoreState<any>;

    constructor(store: StoreState<any>) {
        this.store = store;
    }

    get(key: string): any {
        return this.store[key];
    }

    set(key: string, value: any): void {
        this.store[key] = value;
    }

    remove(key: string): void {
        delete this.store[key];
    }

    clear(): void {
        this.store = {};
    }

    reset(): void {
        this.clear();
    }

    commit(method: string, ...args: any[]): void {
        this.store[method](...args);
    }
}

export default PiniaStore;