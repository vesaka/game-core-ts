import Collection from "@/core/lib/collection";
import { extend } from "@/core/utils/object.util";
import Screen from "@/core/2d/pixi/ui/screen";

class ScreensCollection extends Collection {

    constructor(options: CollectionOptions) {
        super(options);

        this.$listen({
            game: ['loading', 'loaded', 'ready'],
            screen: ['select', 'change'],
            scene: ['update'],
            move: ['next', 'back']
        })

    }

    game_loading() {
        const { catalogue } = this;
        const firstKey = Object.keys(catalogue)[0];

        const screen = this.loadScreen(firstKey);
        screen.show();
    }

    loadScreen(key: string, options: AnyObject = {}): Screen {
        const { types } = this;

        let screen: Screen = this.first((item: Screen) => item.key === key);
        if (!screen) {
            const screenOptions = extend(types[key] || {}, options || {}) as AnyObject;
            screenOptions.key = key;
            screen = this.addItem(screenOptions);
            this.i18n.load(screen.getKey()).then(() => {
                screen.build();
            });

            this.$emit('screen_loaded', screen);
        }

        
        return screen;
        
    }

    screen_change(name: string, options: AnyObject = {}) {
        this.select(name, options);
    }

    select(key: string, options: AnyObject = {}) {
        let screen: Screen = this.loadScreen(key, options);
        screen.show();
    }


}

export default ScreensCollection;