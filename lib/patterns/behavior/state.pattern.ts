class State<T> {

    protected list: ValueOf<T>[] = [];

    set(state: ValueOf<T>) {
        this.list = [state];
    }

    has(state: ValueOf<T>): boolean {
        return this.list.includes(state);
    }

    is(state: ValueOf<T>): boolean {
        return this.list.length === 1 && this.list[0] === state;
    }

    add(state: ValueOf<T>) {
        if (!this.has(state)) {
            this.list.push(state);
        }
    }

    remove(state: ValueOf<T>) {
        this.list = this.list.filter((item) => item !== state);
    }

}

export default State;