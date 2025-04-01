import Modal from "@/core/2d/pixi/ui/modals/modal";
import { FederatedPointerEvent } from "pixi.js";
import ModalButton from "../buttons/modal.button";
import { extend } from "@/core/utils/object.util";

class WarningModal extends Modal {

    createButtons<S extends string>(options: ModelCollection, prompt: ModalPromptOptions<string, string, string, string, string, FederatedPointerEvent>): ModalButton<S>[] {
        const { def, types } = options;
        console.log(def, types);
        const button = new ModalButton<S>(extend(def, types.ok) as UiOptions, this.size); 
        button.put<string>('OK');
        button.view.on('pointerup', (e: FederatedPointerEvent) => {
            this.close();
        })
        console.log(options.def, options.types);
        this.view.addChild(button.view);

        return [button];
    }
} 

export default WarningModal;