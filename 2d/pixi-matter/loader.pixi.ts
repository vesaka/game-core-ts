import { Assets, ArrayOr, AssetInitOptions, ProgressCallback } from 'pixi.js';
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
        this.$emitAndStop('game_loading');
        await Assets.init(options);

        const firstBundleId = options.manifest.bundles[0].name;

        await Assets.backgroundLoadBundle(firstBundleId);
        await this.loadBundle(firstBundleId, () => {
            this.$emit.bind(this, 'assets_loading');
        
        });

        this.$emitAndStop('game_loaded');
    }

    add(url: string) {
        return Assets.add(url);
    }

    addBundle(name: string, bundle: ArrayOr<any>,) {
        return Assets.addBundle(name, bundle);
    }

    async loadBundle(name: string, callback: ProgressCallback) {

        try {
            const assets = await Assets.loadBundle(name, callback);
            for (let key in assets) {
                this.$emitAndStop(`${key}_loaded`, assets[key])
            }

        } catch (e) {
            this.$emit(`asset_failed`, name);
            console.error(e)
        }

    }

}

export default Loader;