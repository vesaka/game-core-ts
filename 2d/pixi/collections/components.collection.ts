import Collection from "@/core/lib/collection";
import { extend } from "@/core/utils/object.util";
class ComponentsCollection extends Collection {

    constructor(options: AnyObject = {}) {
        super(options);
    }

    buildComponent(options: AnyObject, size: Size2D) {
        const component = this.catalogue[options.key] || Object.values(this.catalogue)[0];
        return new component(options, size);
    }

    loadComponent(key: string, size: Size2D) {
        const component = this.get(key);
        if (component) {
            return component;
        }

        const setup = extend({
            key: key,
            size,
            position: { x: 0, y: 0 },
            path: this.path,
        }, this.types[key] || {}) as UiOptions;

        const Component = this.catalogue[key] || Object.values(this.catalogue)[0];
        const newComponent = new Component(setup, size);
        this.add(newComponent);
        return newComponent;
    }

}

export default ComponentsCollection;