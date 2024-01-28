import Collection from "@/core/lib/collection";
import { raw } from "@/core/utils/object.util";
import Screen from "@/core/2d/pixi/ui/screen";

class ScreensCollection extends Collection {

    constructor(options: CollectionOptions) {
        super(options);

        this.$listen({
            game: ['loading', 'loaded'],
            screen: ['select', 'change']
        })

    }

    game_loading() {
        const { catalogue } = this;
        const firstKey = Object.keys(catalogue)[0];

        const screen = this.loadScreen(firstKey);
        screen.show();
    }

    loadScreen(key: string): Screen {
        const { types } = this;

        let screen: Screen = this.first((item: Screen) => item.key === key);

        if (!screen) {
            const screenOptions = raw(types[key] || {});
            screenOptions.key = key;

            screen = this.addItem(screenOptions);
            screen.build();
        }

        return screen;
        
    }

    screen_change(name: string) {
        this.select(name);
    }

    select(key: string) {
        let screen: Screen = this.loadScreen(key);
        screen.show();
    }

}

export default ScreensCollection;