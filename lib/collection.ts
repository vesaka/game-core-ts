import Container from '@/core/container';
import { extend, raw } from '@/core/utils/object.util';

class Collection<T = KeyAttributeConfig, K = AnyObject> extends Container implements CollectionInterface<T> {

    protected items: T[] = [];

    protected catalogue: CatalogueList<K> = {}; 

    protected name: string = 'collection';

    protected def: { [key: string]: any } = {};

    protected types: { [key: string]: any } = {};
    
    protected collection: CollectionDefTypes<AnyObject> = {
        def: {},
        types: {}
    };


    constructor(options?: CollectionOptions<T, K>) {
        super();

        this.setup(options);
        
    }

    setup(options?: CollectionOptions<T, K>) {
        if (Array.isArray(options)) {
            this.items = options;
        } else if (options) {
            this.name = options.key;
            this.items = Array.isArray(options.items) ? options.items : [];

            if (options.def) {
                this.def = options.def;
            }

            if (options.types) {
                this.types = options.types;
            }

            if (options.catalogue) {
                this.catalogue = options.catalogue;
            }
            
        }
    }

    setCatalogue(catalogue: any): this {
        this.catalogue = catalogue;
        return this;
    }

    buildItems() {
        const { def, types } = this;
        const items: T[] = [];

        for (let key in types) {
            const item = extend(def, types[key]) as any;
            item.key = key;
            items.push(this.buildItem(item));
        } 
        this.items = items;
        return items;

    }

    buildItem(options: any): any {
        const { catalogue } = this;
        const itemClass: any = catalogue[options.key] || catalogue[Object.keys(catalogue)[0]];
        return new itemClass(options);     
    }

    addItem(options: KeyAttributeConfig): any {
        const item = this.buildItem(extend(this.def, raw(options)));
        this.items.push(item);
        return item;
    }

    all() {
        return this.items;
    }

    count(condition?: ArrayFilterCallback): number {
        if (typeof condition === 'function') {
            return this.filter(condition).count();
        }

        return this.items.length;
    }

    avarage(key: string | number): number {
        return this.items.reduce((a: any, b: any) => a + b[key], 0) / this.items.length;
    }

    avg(key: string | number): number {
        return this.avarage(key);
    }

    add(item: any) {
        this.items.push(item);
        return this;
    }

    get(key: number | string = 0): any {
        if (typeof key === 'number') {
            return this.items[key];
        }

        return this.first((item: KeyAttributeConfig) => item.key === key);
    }

    remove(at: number) {
        this.items.splice(at, 1);
        return this;
    }
    
    find(condition: Function): any {
        return this.first(condition);
    }

    first(condition: Function): any {
        for (let i in this.items) {
            const stop = condition(this.items[i], i);
            if (true === stop) {
                return this.items[i];
            }
        }
        return null;
    }

    map(callback: Function): any[] {
        const result = [];
        for (let i in this.items) {
            result.push(callback(this.items[i], i));
        }
        return result;
    }

    each(callback: Function): this {
        for (let i in this.items) {
            const stop = callback(this.items[i], i);
            if (true === stop) {
                break;
            }
        }
        return this;
    }

    reduce(callback: Function, start: any): any {
        let accumulator = start;
        const len = this.count();
        for (let i = 0; i < len; i++) {
            if (accumulator) {
                accumulator = callback(accumulator, this.items[i], i);
            } else {
                accumulator = this.items[i];
            }
        }

        return accumulator;
    }

    filter(condition: ArrayFilterCallback): Collection<T> {
        if (typeof condition !== 'function') {
            condition = (item: any) => {
                return undefined !== item;
            };
        }

        return new Collection(this.items.filter(condition));
    }

    merge() {
        for (let i in arguments) {
            if (Array.isArray(arguments[i])) {
                this.items.concat(arguments[i]);
            }
        }

        return this;
    }
    
    min(property: keyof T | Function) {
        if (0 === this.items.length) {
            return null;
        }
        
        let min: number = 10000, callback: Function = () => true;
        
        if (typeof property === 'function') {
            min = property(this.items[0]);
            callback = property;
        } else if (['string', 'number'].includes(typeof property)) {
            min = this.items[0][property] as number;
            callback = (item: any) => {
                if (min > item[property]) {
                    min = item[property];
                }
            };
        }
        
        this.each(callback);
        
        return min;
    }
    
    max(property: Function | keyof T) {
        if (0 === this.items.length) {
            return null;
        }
        
        let max: number = 0, callback: Function = () => true;
        if (typeof property === 'function') {
            max = property(this.items[0]);
            callback = property;
        } else if (['string', 'number'].includes(typeof property)) {
            max = this.items[0][property] as number;
            callback = (item: any) => {
                if (max < item[property]) {
                    max = item[property];
                }
            };
        }
        
        this.each(callback);
        
        return max;
    }
    
    unique(property: MapFunction<T> | keyof T | null = null) {
        let items = [];
        if (typeof property === 'function') {
            items = this.items.map(property);
        } else if (['string', 'number'].includes(typeof property) && null !== property) {
            items = this.items.map((item: T) => item[property]);
        } else {
            items = this.items;
        }
        
        return items.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    }

    sum(arg: any) {
        let sum = 0;
        if ((typeof arg === 'string') || (typeof arg === 'number')) {
            this.each((item: any) => {
                if (item[arg]) {
                    sum += Number(item[arg]);
                }
            });

        } else if (typeof arg === 'function') {
            this.each((item: any, key: string | number) => {
                sum += Number(arg(item, key));
            });
        }

        return sum;
    }

    random() {
        return this.items[Math.floor(Math.random() * this.count())]
    }

    shuffle() {
        let currentIndex = this.items.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.items[currentIndex], this.items[randomIndex]] = [
                this.items[randomIndex], this.items[currentIndex]];
        }

        return this;
    }

    slice(start = 0, end = 0) {
        return new Collection(this.items.slice(start, end));
    }

    clear() {
        this.items = [];
        return this;
    }

    create(...names: string[]) {
        console.log('create', names);
    }

    load(key: string): K {
        const component = this.get(key);
        if (component) {
            return component;
        }

        const setup = extend({
            key: key,
            size: { width: 1, height: 1 },
            position: { x: 0, y: 0 },
            path: this.path,
            bounds: this.def.bounds
        }, this.types[key] || {}) as UiOptions;

        const Component = this.catalogue[key] || Object.values(this.catalogue)[0] as K;
        const newComponent = new Component(setup);
        this.add(newComponent);
        return newComponent;
    }

    destroy(...names: string[]): void {
        names;
    }

    where(where: AnyObject | Function | string, value: StringOr<Number>): T | null {
        if (typeof where === 'string' && value) {
            return this.find((item: any) => item[where] === value);
        }
        if (typeof where === 'function') {
            return this.find(where);
        }

        if (typeof where === 'object' && null !== where) {
            return this.find((item: any) => {
                for (let key in where) {
                    if (item[key] !== where[key]) {
                        return false;
                    }
                }
                return true;
            });
        }

        return null;
    }
}
;

export default Collection;

