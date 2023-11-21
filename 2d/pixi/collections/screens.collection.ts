import Collection from "@/core/lib/collection";
import { raw } from "@/core/utils/object.util";
import Screen from "../ui/screen";


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
            const screenOptions = raw(types[key]);
            screenOptions.key = key;

            screen = this.addItem(screenOptions);
            screen.build();
        }

        return screen;
        
    }

    select(key: string) {
        let screen: Screen = this.loadScreen(key);

        this.map((item: Screen) => {
            if (key !== item.key) {
                item.hide();
            }
        });

        screen.show();
        
    }

}

export default ScreensCollection;