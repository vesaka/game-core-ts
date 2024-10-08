
class Factory<T> {

    protected map: CatalogueList<T> = {};

    create<P = AnyObject>(name: string, options: P, ...args: any[]): T {
        const { map } = this;
        const itemClass = map[name] || map[Object.keys(map)[0]];
        return new itemClass(options, ...args);        
    }
}

export default Factory;