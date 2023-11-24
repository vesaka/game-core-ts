import Collection from "@/core/lib/collection";

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
                types[name].key = name;
                const model = this.addItem(types[name]);
                this.$emit('model_created', model);
            }
        }
    }
   
}

export default ModelCollection;