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

    static length(tag: string): number {
        return Action.map.get(tag)?.length as number;
    }

    static splice(tag: string, index: number, count: number): void {
        const map = Action.map.get(tag);
        if (Array.isArray(map)) {
            Action.map.set(tag, map.splice(index, count));
        }
    }
};
 
export default Action;