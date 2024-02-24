import UI from "@/core/2d/pixi/ui/ui";

abstract class Button<C = string, U = UiOptions> extends UI<U> {

    abstract put(content: C): void;
    
}

export default Button;