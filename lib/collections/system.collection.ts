import Collection from "@/core/lib/collection";

class SystemCollection extends Collection {


    create() {
        for (let key in this.catalogue) {
            const classType = this.catalogue[key] as any;
            const provider = new classType() as SystemInterface;
            provider.setup();
            
            this.add(provider);
            this.$set(key, provider);
        }

        this.each((provider: SystemInterface) => {
            provider.boot();
        })
    }

}

export default SystemCollection;