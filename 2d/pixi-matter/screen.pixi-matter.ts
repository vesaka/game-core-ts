import Container from "@/core/container";

class Screen extends Container {

    protected _name: string = 'screen';

    protected active: boolean = false;

    constructor(options: any) {
        super();
        Object.assign(this, options);
        this.$listen({
            screen: ['active', 'inactive']
        })
    }
}

export default Screen;