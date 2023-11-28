
import { raw, extend } from '@/core/utils/object.util';
class Factory {

    protected  collection: any = {};

    protected catalogue: any = {};

    constructor(collection: CollectionInterface, catalogue: any) {
        this.collection = collection;
        this.catalogue = catalogue;
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
}

export default Factory;