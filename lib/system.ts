import Container from "@/core/container";

class System extends Container implements SystemInterface {

    constructor() {
        super();
        this.name = this.constructor.name.replace('System', '').toLocaleLowerCase();
    }

    setup() {}

    boot() {}
}

export default System;