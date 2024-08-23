import Component from "@/core/2d/pixi/ui/component";
import TabComponent from "./tab.component";

class TabsComponent<T = TabComponent> extends Component<T> {
    
    protected tabs: T[] = [];

    // protected activeTab: T;

    protected activeTabId: number = 0;

    setActiveTab(tabId: number) {
        this.activeTabId = tabId;
        this.activeTab = this.tabs[tabId];
    }

    setup() {

    }

    createButtons() {

    }

    createTabs() {}
}

export default TabsComponent;