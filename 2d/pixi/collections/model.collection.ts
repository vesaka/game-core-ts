import Collection from "@/core/lib/collection";

class ModelCollection extends Collection {

    constructor() {
        super();
        this.setup(this.options.models);
    }

   
}

export default ModelCollection;