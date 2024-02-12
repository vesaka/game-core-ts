import { Assets, ArrayOr, AssetInitOptions, ProgressCallback,AssetsBundle } from 'pixi.js';
import Container from '@/core/container';

class Loader extends Container {

    protected manifest: PixiManifest = {};
    constructor(options: AssetInitOptions) {
        super();
        this.options = options;

        this.$listen({
            assets: ['loading', 'complete']
        })

    }

    async load() {
        const { options } = this;
        const { bundles } = options.manifest;

        this.$emitAndStop('game_loading');

        await Assets.init(options);

        const [ firstBundle, ...restBundles ] = bundles;

        await this.loadBundle(firstBundle.name, (progress: number) => {
            this.$emit('assets_loading', progress);
        });

        for(const bundle of restBundles) {
            Assets.backgroundLoadBundle(bundle.name);
        }

        this.$emitAndStop('game_loaded');
    }

    add(url: string) {
        return Assets.add(url);
    }

    get(name: string) {
        return Assets.get(name);
    }

    addBundle(name: string, bundle: ArrayOr<any>,) {
        return Assets.addBundle(name, bundle);
    }


    loadBundle(bundleName: string, callback: ProgressCallback) {
        try {
            return Assets.loadBundle(bundleName, callback);
        } catch (e) {
            this.$emit(`asset_failed`, bundleName);
            console.error(e)
        }  

    }

    async backgroundLoadBundle(name: string) {
        
    }

    async loadAsset(name: string) {
        const asset = await Assets.load(name);
        if (asset) {
            this.$emit(`loaded_${name}`, asset);
        }
    }

}

export default Loader;