class Action {
    static map = new Map<string, Function[]>();
    static on(tag: string, callback: Function) {
        if (!Action.map.has(tag)) {
            Action.map.set(tag, []);
        }

        Action.map.get(tag)?.push(callback);
    }
    static off(...tags: string[]): void {
        tags.forEach((tag: string) => {
            Action.map.delete(tag);        
        });
    }
    
    static clear(): void {
        Action.map.clear();
    }

    static emit(tag: string, ...args: any[]) {
        Action.map.get(tag)?.forEach((callback: Function) => {
            callback.apply(this, args);
        });        
    }
};
 
export default Action;