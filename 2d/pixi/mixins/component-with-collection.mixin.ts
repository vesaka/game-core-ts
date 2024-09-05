import Collection from "@/core/lib/collection";
export default {
    filter_components(components: KeyAttributeConfig): Collection {
        return new Collection(components);
    }
};