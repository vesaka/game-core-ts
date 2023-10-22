import Container from '@/core/container';
import { raw, extend } from '@/core/utils/object.util';

abstract class Builder extends Container {

    protected  collection: any = {};

    protected catalogue: any = {};

    constructor(collection: Collection) {
        super();
        this.collection = collection;
    }

    createItems() {
        const { def, types } = this.collection;
        const items: any[] = [];

        for (let key in types) {
            const item = extend(raw(def), types[key]) as any;
            item.key = key;
            items.push(this.createItem(item));
        }

        return items;

    }

    createItem(options: any) {
        const { catalogue } = this;
        const itemClass = catalogue[options.key] || catalogue[Object.keys(catalogue)[0]];
        return new itemClass(options);        
    }

    abstract createCollection(): CollectionInterface;
}

export default Builder;