
declare type ApiResponse = AxiosResponse<any>|Response;
declare type RequestParams = Object;
declare type RequestHeaders = AxiosHeaders | Object;
declare type FunctionOrNull = Function | null;
declare type ArrayFilterCallback = (item: any, index: number) => boolean;
declare type ValueOf<T> = T[keyof T];
declare type KeyOf<T> = keyof T;
declare type ArrayOr<T> = T | T[];
declare type StringOr<T> = T | string;
declare type NumberOr<T> = T | number;
declare type ObjectOr<T> = T | Object;
declare type BooleanOr<T> = T | boolean;
declare type ObjectWith<T> = {[key: string]: T;}
declare type KeyValuePair<V = any> = {key: string, value: V};
declare type CallbackFunction<T> = (event: T) => unknown;

type emptyOrOne = '' | 1;
type oneToNine = 1|2|3|4|5|6|7|8|9
type zeroToNine = 0|1|2|3|4|5|6|7|8|9

type YYYY = `${emptyOrOne}9${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = `0${oneToNine}` | `1${0|1|2}`
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`
declare type RawDateString = `${YYYY}${MM}${DD}`;
declare type SlashDateString = `${MM}/${DD}/${YYYY}`;
declare type DashDateString = `${MM}-${DD}-${YYYY}`;
declare type TimeString = `${HH}:${MM}:${SS}`;
declare type TimeDashString = `${DashDateString}T${TimeString}`;

declare type OldYear = `${zeroToNine}${zeroToNine}${zeroToNine}${zeroToNine}`;
declare type NewYear = `${oneToNine}${zeroToNine}${zeroToNine}${zeroToNine}`;

declare type Alignment = ['left', 'right', 'center', 'justify', 'initial', 'inherit'];
declare type Placement = ['top', 'bottom', 'left', 'right', 'center'];
declare type Placement2D = ValueOf<Placement> | `${ValueOf<Placement>}-${ValueOf<Placement> | 'center'}`;
declare type ScrollBarPlacement = ['top', 'bottom', 'left', 'right'];
declare type Direction = ['up', 'down', 'left', 'right'];
declare type EdgeVerticalPlacement = 'top' | 'bottom';
declare type EdgeHorizontalPlacement = 'left' | 'right';
declare type MapFunction<T> = (item: T, index: number, array: Array<T>) => T;

declare type ConnectOptions = {
    url: string;
    headers?: RequestHeaders;
    params?: RequestParams;
};
declare type AnyObject<V = any> = {
    [key: string | number]: V
}

declare type AuthUser = {
    name: string;
    token: string;
    isGuest?: boolean;
    data?: AnyObject;
}

declare type CollectionDefTypes<T extends Object> = {
    def: T,
    types: {
        [key: string]: T;
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
    rotation?: Vector2D | Vector3D;
    [key: string]: any;
} & UiOptions;


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
    options: {};
    
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

declare type KeyAttributeConfig<T = AnyObject> = {
    key?: string;
    [key: string]: T;
    [key: number]: T;
}

declare type CatalogueList<T> = {
    [key: string]: typeof T;
}

declare interface HasCatalogue<T> {
    protected catalogue: CatalogueList<T>;
}

declare type CollectionOptions<T = KeyAttributeConfig<AnyObject>, K = CatalogueList<AnyObject>> = {
    key: string;
    items: T[];
    catalogue?: K;
} & CollectionDefTypes | T[];

declare type LogicalOperator = '&' | '|' | '||' | '&&' | '==' | '!=' | '===' | '!==' | '<' | '>' | '<=' | '>=' | 'in' | 'not in';
declare type MathOperator = '+' | '-' | '*' | '/' | '%';

declare type ActionsList = {
    [key: string]: string[];
}

declare type PixiGraphicsOptions = {
    fill?: number | string;
    color?: number | string;
    alpha: number;
    line: LineStyle;
    style: TextStyle;
}

declare type UiOptions = {
    key: string;
    position: Vector2D;
    size: Size2D;
    bounds?: Size2D;
    rotation: Vector2D;
    offset: Vector2D;
    margin: NumberOr<Vector2D>;
    padding: NumberOr<Vector2D>;
    align: ValueOf<Alignment>;
} & PixiGraphicsOptions;

declare type TabsOptions<T> = {
    tabs: T[];
    direction: 'horizontal' | 'vertical';
    placement: Placement2D;
    active?: number = 0;
} & UiOptions;

declare type SliderOptions = {
    limit: number;
} & TabsOptions;

declare type TabButtonOptions = {
    title: string;
    index: number;
} & UiOptions;

declare type ComponentsOptions<T = UiOptions> = {
    type: string;
    components: ObjectWith<T>;
} & UiOptions;

declare type PaginationOptions = {
    page: number;
    pageSize: number;
    total: number;
    offset: number;
    size: Size2D,
    position: Vector2D
}

declare type GridOptions = {
    rows: number;
    columns: number;
    offset?: NumberOr<Vector2D>;
    size: Size2D;
};

declare type SlotOptions = {
    index: number;
} & UiOptions;

declare type Slot = {
    x: number;
    y: number;
    ax: number;
    ay: number;
    bx: number;
    by: number;
    cx: number;
    cy: number;
    dx: number;
    dy: number;
    width: number;
    height: number;
    available: boolean;
    locked: boolean;
}

declare type ScrollerOptions = {
    thumb?: AnyObject;
    track?: AnyObject;
    arrows?: AnyObject;
    volume?: number;
    vertical?: boolean | ValueOf<EdgeVerticalPlacement>,
    horizontal?: boolean | ValueOf<EdgeHorizontalPlacement>,

} & UiOptions;

declare type Slots2dMap = {
    [key: number]: {
        [key: number]: Slot;
    };
}

declare type TextOptions = {
    text: string;
} & UiOptions;

declare type ModalOptions = UiOptions;


declare type ModalComponentOptions = {
    header: BooleanOr<UiOptions>;
    body: UiOptions;
} & ModalOptions;   

declare type ModalPromptOptions<H = string, B = string, O = string, C = string, X = string, F = Function> = {
    transition: Function = () => {};
    body: B;
    header: H;
    confirm: O = 'OK',
    cancel: C = 'Cancel',
    dismiss: X = 'X',
    callbacks: {
        ok: CallbackFunction<F>,
        cancel: CallbackFunction<F>,
        dismiss: CallbackFunction<F>,
    },
    onConfirm?: CallbackFunction<F>;
    onCancel?: CallbackFunction<F>;
    onDismiss?: CallbackFunction<F>;
    onReady?: Function;
} & ModalOptions;

declare enum ModalType {
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error',
}

declare type ModalButtonsTexts = {
    confirm: string;
    cancel: string;
    dismiss: string;
} & ModalOptions;

declare type ModalConfirmTexts = {
    title: string;
    text: string;
} & ModalButtonsTexts;

declare type TransitionalProps = {
    [key: string]: [number, number];
}

declare interface WithSingleStatus<T> {
    status: ValueOf<T>;
    is(status: ValueOf<T>): boolean;
    isNot(status: ValueOf<T>): boolean;
    setStatus(status: ValueOf<T>): void;
    clearStatus(): void;
}

declare interface WithManyStatuses<T> {
    status: ValueOf<T>[];
    is(status: ValueOf<T>): boolean;
    isNot(status: ValueOf<T>): boolean;
    setStatus(status: ValueOf<T>): void;
    clearStatus(): void;
}