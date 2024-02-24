import Action from '@/core/lib/action';

interface EventsList<T = string[]> {
    [key: string]: T;
};

class Container<T = GameOptions> {

    mixins?: Mixin[] = [];

    container?: HTMLElement;

    static options?: GameOptions;

    static layers?: any[];
    
    [key: string]: Function | any;

    constructor(options?: T, toPrototype: boolean = true) {
        if (toPrototype) {
            Object.assign(Container.prototype, options);
        } else {
            Object.assign(this, options);
        }


        this.addMixins();
        
    }

    addMixins(mixins: Mixin[]|undefined = this.mixins) {
        if (!Array.isArray(mixins)) {
            return;
        }

        for (const mixin of mixins) {
            for (let attribute in mixin) {
                if ('data' === attribute && mixin.data instanceof Function) {
                    Object.assign(this, mixin.data() || {});
                    continue;
                }

                if (typeof this[attribute] === 'function' && typeof mixin[attribute] === 'function') {
                    this.$on(attribute, (...args: any[]) => { mixin[attribute].apply(this, args); });
                } else {
                    this[attribute] = mixin[attribute];
                }
            }
        }
    }

    applyFilters<T = AnyObject>(options: T) {
        let filterMethod: keyof Container,
            name: keyof Container;

        for (let attribute in options) {
            name = attribute;
            filterMethod = `filter_${attribute}`;
            if (typeof this[filterMethod] === 'function') {
                this[name] = this[filterMethod](options[attribute]);
            } else {
                this[name] = options[attribute];
            }
        }
    }

    $on(tag: string, callback: Function) {
        Action.on(tag, callback);
    }

    $off(...tags: string[]) {
        Action.off(...tags);
    }

    $clear() {
        Action.clear();
    }

    $emit(tag: string, ...args: any[]) {
        Action.emit(tag, ...args);
    }

    $emitAndStop(tag: string, ...args: any[]) {
        Action.emit(tag, ...args);
        Action.off(tag);
    }

    $listen(events: EventsList) {
        let name: string;
        for (name in events) {
            if (!Array.isArray(events[name])) {
                continue;
            }
            for (let i in events[name]) {
                let method = `${name}_${events[name][i]}`;
                if (typeof this[method] === 'function') {
                    this.$on(method, this[method].bind(this));
                }
            }
        }
    }

    $set(name: string, value: any, overwrite: boolean = false) {
        if (!overwrite && Container.prototype[name]) {
            return
        }
    
        Container.prototype[name] = value;
        
        
    }
}

export default Container;