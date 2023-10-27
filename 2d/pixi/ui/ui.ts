import Container from "@/core/container";
import { snakeCase } from "@/core/utils/string.util";

class UI extends Container{
    protected name: string;

    constructor() {
        super();

        this.name = snakeCase(this.constructor.name);
        
    }
}

export default UI;