abstract class Dispatcher<A> {

    protected readonly map: MapWith<A>;

    constructor() {
        this.map = this.createMap();
    }

    static get instance(): Dispatcher<any> {
        return new (this as any)();
    }

    abstract createMap(): MapWith<A>;

    get<T = string>(handler: T): A {
        return (this.map[handler as string] || this.map[Object.keys(this.map)[0]]) as A;
    }

    each(commands: Array<string>, callback: Function) {
        commands.forEach((command: string) => {
            const [handler, ...params] = command.split(' ');

            let instance: A;
            const Handler = this.map[handler];
            if (Handler) {
                instance = new Handler(params);
            } else {
                const DefaultHandler = Object.values(this.map)[0];
                instance = new DefaultHandler([handler, ...params]);
            }
            callback(instance);
        });
    }

    some(commands: Array<string>, callback: Function, pass: boolean = false) {
        this.each(commands, (strategy: A) => {
            if (!pass) {
                pass = callback(strategy);
            }
        });
        return pass;
    }

    every(commands: Array<string>, callback: Function, pass: boolean = true) {
        this.each(commands, (strategy: A) => {
            if (pass) {
                pass = callback(strategy);
            }
        });
        return pass;
    }

}

export default Dispatcher;