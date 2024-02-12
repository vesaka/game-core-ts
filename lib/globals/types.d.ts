
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
        basePath: string;
    };
    i18n?: {
        locale: string;
        basePath: string;
    },
    store?: {},
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

declare type PixiGraphicsOptions = {
    fill?: number | string;
    color?: number | string;
    line: LineStyle;
    style: TextStyle;
}

declare type BundleConfig = {
    name: string;
    assets: ArrayOr<any>;
}

declare type KeyAttributeConfig<T = AnyObject> = {
    key?: string;
    [key: string]: T;
    [key: number]: T;
}

declare type CollectionOptions<T = AnyObject> = {
    key: string;
    items: KeyAttributeConfig<T>[];
    catalogue?: any;
} & CollectionDefTypes | KeyAttributeConfig<T>[];

declare type LogicalOperator = '&' | '|' | '||' | '&&' | '==' | '!=' | '===' | '!==' | '<' | '>' | '<=' | '>=' | 'in' | 'not in';
declare type MathOperator = '+' | '-' | '*' | '/' | '%';

declare type Requirement<T = string, K = number> = [T, LogicalOperator, K];
declare type ImpactCommand<T = string, K = number> = [T, MathOperator, K];
declare type Choice = {
    text: string;
    requirements?: Requirement<string, number>[];
    impact?: ImpactCommand<string, number>[];
    action?: string;
}

declare type OptionalText = {r
    seen?: boolean;
    enabled?: boolean;
    requirements?: Requirement<string, number>[];
    content: Content
}

declare type Content = Array<string, Choice>;

declare type InteractiveScene<T = string> = {
    description?: string;
    background: string;
    type: T = 'narrator',
    seen?: boolean = false;
    enabled?: boolean = true;
    character: string = 'narrator';
    content: Content;
    requirements?: Requirement<string, number>[];
    impact?: ImpactCommand<string, number>[];
    choices?: Choice[];
}

declare type ActionsList = {
    [key: string]: string[];
}

declare type PaginationOptions = {
    page: number;
    pageSize: number;
    total: number;
    offset: number;
    size: Size2D,
    position: Vector2D = { x: 0, y: 0},


}