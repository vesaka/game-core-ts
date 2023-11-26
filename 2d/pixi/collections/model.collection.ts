import Collection from "@/core/lib/collection";
import { raw } from "@/core/utils/object.util";

class ModelCollection extends Collection {

    constructor() {
        super();
        this.setup(this.options.models);
    }

    create(...names: string[]) {
        if (!names.length) {
            names = Object.keys(this.catalogue);
        }

        const { types } = this;
        for (let name of names) {
            if (types[name]) {
                const options = raw(types[name]);
                options.key = name;
                const model = this.addItem(options);
                this.$emit('model_created', model);
            }
        }
    }
   
}

export default ModelCollection;