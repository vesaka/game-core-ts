
declare type ApiResponse = AxiosResponse<any>|Response;
declare type RequestParams = Object;
declare type RequestHeaders = AxiosHeaders | Object;
declare type FunctionOrNull = Function | null;
declare type ArrayFilterCallback = (item: any, index: number) => boolean;

declare type ConnectOptions = {
    url: string;
    headers?: RequestHeaders;
    params?: RequestParams;
};
declare type AnyObject = {
    [key: string | number]: any
}

declare type AuthUser = {
    name: string;
    token: string;
    isGuest?: boolean;
    data?: AnyObject;
}

declare type CollectionDefTypes = {
    def: {
        [key: string]: any;
    },
    types: {
        [key: string]: any;
    },
}

declare type ModelCollection = {
    def: ModelOptions;
    types: {
        [key: string]: ModelOptions;
    };
}

declare type UiCollection = {
    def: UiOptions;
    types: {
        [key: string]: UiOptions;
    };
}

declare type ModelOptions = {
    size?: Size2D | Size3D;
    position?: Vector2D | Vector3D;
    rotation?: Vector2D | Vector3D;
    [key: string]: any;
}

declare type UiOptions = {
    style?: any;
    position?: Vector2D;
    [key: string]: any;
}

declare type ClassList = {
    [key: string]: boolean;
};

declare type Mixin = {
    data?: Function;
    [key: string]: any;
}

declare type Size2D = {
    width: number;
    height: number;
}

declare type Size3D = {
    width: number;
    height: number;
    depth: number;
}

declare type Vector2D = {
    x: number;
    y: number;
}

declare type Vector3D = {
    x: number;
    y: number;
    z: number;
}

declare type GameOptions = {
    container: HTMLElement;
    mixins?: Mixin[];
    assets?: {
        manifest: string;
    };
    options: {
        world: {
            size: Size2D;
        },
        ui: {
            
        }
    };
    
}

declare type PixiManifest = {
    bundles?: BundleConfig[];
    assets?: AssetConfig[];
}

declare type PixiLoaderOptions = {
    manifest: PixiManifest | string;
}

declare type BundleConfig = {
    name: string;
    assets: ArrayOr<any>;
}

declare type KeyAttributeConfig = {
    key: string;
    [key: string]: any;
    [key: number]: any;
}

declare type CollectionOptions = {
    items: KeyAttributeConfig[];
    catalogue?: any;
    collection: CollectionDefTypes;
} | KeyAttributeConfig[];