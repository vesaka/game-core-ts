import Collection from "@/core/lib/collection";

class SystemCollection extends Collection {


    async create() {
        for (let key in this.catalogue) {
            const classType = this.catalogue[key] as any;
            const provider = new classType() as SystemInterface;
            provider.setup();
            
            this.add(provider);
            this.$set(key, provider);
        }

        return Promise.resolve(this.each(async (provider: SystemInterface) => {
            provider.boot();
        })).catch((err) => {
            console.error(err);
        })
    }

}

export default SystemCollection;