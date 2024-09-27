class Pipeline<T, R> {
    
    protected tasks: Function[] = [];

    constructor(protected data: T) {
        this.data = data;
    }

    add(task: Function): this {
        this.tasks.push(task);
        return this;
    }

    addMultiple(...tasks: Function[]): this {
        this.tasks.push(...tasks);
        return this;
    }

    execute(data: T = this.data): R {
        return this.tasks.reduce((acc, task) => task(acc), data as any);
    }

    async resolve(data: T = this.data): Promise<R> {
        return await this.execute(data);
    }
}

export default Pipeline;