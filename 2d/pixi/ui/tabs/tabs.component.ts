import Component from "@/core/2d/pixi/ui/component";
import TabComponent from "./tab.component";
import Button from "@/core/2d/pixi/ui/buttons/button";
import { extend } from "@/core/utils/object.util";
import { Graphics, Text } from "pixi.js";

abstract class TabsComponent<T extends UiOptions = UiOptions, C = Component> extends Component<T> {
    
    protected tabs: T[] = [];

    protected activeTabId: number = 0;

    protected oldTabId: number = 0;

    protected placement: string = 'top-center';

    constructor(options: T) {
        super(options);
        this.panel = new Graphics();
        this.header = new Graphics();
        this.view.addChild(this.header, this.panel);
        
        if (this.types && Object.values(this.types).length) {
            this.buttons = this.createButtons();
            // console.log(this.constructor.name);
            this.setup();
        }
    }

    get catalogue(): ObjectWith<any> {
        return {
            component: Component
        };
    }

    setActiveTab(tabId: number) {
        this.buttons.forEach((button: Button) => {
            if (button.index === tabId) {
                button.setNewStyle({ fill: 0x00ff00 });
            } else {
                button.setNewStyle({ fill: button.style.fill });
            }
        })
        this.oldTabId = this.activeTabId;
        this.activeTabId = tabId;
        this.activeTab = this.tabs[tabId];
        this.showPanel(tabId);
        this.$emit('tab_change', this);
    }


    createView(): Graphics {
        const view = new Graphics();
        view.width = this.size.width;
        view.height = this.size.height;
        return view;
    }


    setupTabs(options: CollectionDefTypes<Object>) {
        this.def = options.def;
        this.types = options.types;
        this.buttons = this.createButtons();
        
        this.setup();
    }

    setup() {
        const { buttons, placement } = this;
        const maxWidth = buttons.reduce((width: number, button: Button) => {
            width = Math.max(width, button.view.width);
            return width;
        }, 0)

        const [align] = placement.split('-');

        for (const button of buttons) {
            if (['left', 'right'].includes(align)) {
                button.view.position.set(0, button.index * button.view.height);
            } else {
                button.view.position.set(button.index * maxWidth, 0);
            }
            this.header.addChild(button.view);
        }

        this.placeHeaderAndPanel();
        this.panels = this.createPanels();
        
        this.setActiveTab(this.activeTabId);

    }

    createButtons() {
        const { def, types } = this;
        const buttons = [];
        let index = 0;
        for (const type in types) {
            const options = extend(def, types[type]) as TabButtonOptions;
            options.key = type;
            options.index = index;
            const button = this.createButton(options);
            buttons.push(button);
            index++;
        }
        return buttons;
    }

    createButton<B = Button>(options: TabButtonOptions): B {
        const button = new Button(options);
        button.view.eventMode = 'static';
        button.view.cursor = 'pointer';

        button.view.on('pointerdown', () => {
            this.setActiveTab(button.index);
        });

        button.view.on('pointerover', () => {
            button.setNewStyle({ fill: 0x00ff00 });
        })

        button.view.on('pointerout', () => {
            if (button.index !== this.activeTabId) {
                button.setNewStyle({ fill: options.style.fill });
            }
            
        })
        button.put(options.title);
        return button as B;
    }

    createPanels() {
        const { types } = this;
        let index = 0;
        const panels = [];
        for (const type in types) {
            const options = extend(this.def, types[type] || {}) as T;
            options.key = type;
            options.size = {
                width: this.panel.width,
                height: this.panel.height
            }
            const panel = this.createPanel(options) as TabComponent;
            panel.index = index;
            this.panel.addChild(panel.view);
            panels.push(panel);
            index++;
        }
        return panels;

    }

    createPanel(options: T): C {
        return new TabComponent(options) as C;
    }

    showPanel(panelId: number) {
        this.panels.forEach((panel: TabComponent, index: number) => {
            panel.view.visible = index === panelId;
            if (index === panelId) {
                panel.active = true;
                panel.build();
                const content = this.buildPanel(panel.key) as Component;
                panel.view.addChild(content.view);
                this.activePanel = panel;
                
            } else {
                panel.active = false;
                panel.view.removeChildren();
            }
        });
    }

    placeHeaderAndPanel() {
        const { header, placement, size } = this;
        const dim = {
            x: 0,
            y: 0,
        };

        const panel = {
            x: 0,
            y: 0,
            width: size.width,
            height: size.height
        }

        switch (placement) {
            case 'top-center':
                dim.x = (size.width - header.width) * 0.5;
                panel.y = header.height;
                panel.height = size.height - header.height;
                break;
            case 'top-right':
                dim.x = size.width - header.width;
                panel.y = header.height;
                panel.height = size.height - header.height;
                break;
            case 'bottom-left':
                dim.y = size.height - header.height;
                panel.x = header.width;
                panel.width = size.width - header.width;
                break;
            case 'bottom-center':
                dim.x = (size.width - header.width) * 0.5;
                dim.y = size.height - header.height;
                panel.x = 0;
                panel.width = size.width;
                break;
            case 'bottom-right':
                dim.x = size.width - header.width;
                dim.y = size.height - header.height;
                panel.x = 0;
                panel.width = size.width - header.width;
                break;
            case 'left-bottom': 
                dim.y = size.height - header.height;
                panel.x = header.width;
                panel.width = size.width - header.width;
                break;
            case 'left-center':
                dim.y = (size.height - header.height) * 0.5;
                panel.x = header.width;
                panel.width = size.width - header.width;
                break;
            case 'right-top':
                dim.x = size.width - header.width;
                panel.y = header.height;
                panel.height = size.height - header.height;
                break;
            case 'right-center':
                dim.x = size.width - header.width;
                dim.y = (size.height - header.height) * 0.5;
                panel.y = 0;
                panel.height = size.height;
                
                break;
            case 'center-top':
                dim.x = (size.width - header.width) * 0.5;
                panel.y = header.height;
                panel.height = size.height - header.height;
                break;
            case 'right-bottom':
                dim.x = size.width - header.width;
                dim.y = size.height - header.height;
                panel.y = 0;
                panel.height = size.height - header.height;
                break;
            case 'center-left':
                dim.y = (size.height - header.height) * 0.5;
                panel.x = header.width;
                panel.width = size.width - header.width;
                break;
            case 'center-right':
                dim.x = size.width - header.width;
                dim.y = (size.height - header.height) * 0.5;
                panel.y = 0;
                panel.height = size.height;
                break;
            default:
                break;

        }

        header.position.set(dim.x, dim.y);
        this.panel.beginFill(0x000000, 0.35);
        this.panel.drawRect(0, 0, panel.width, panel.height);
        this.panel.endFill();
        this.panel.position.set(panel.x, panel.y);

    }

    buildPanel(key: string): C {
        return new Component({ key }) as C;
    }
}

export default TabsComponent;