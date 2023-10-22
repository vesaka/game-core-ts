interface ServiceInterface {
    connect(): ApiResponse;
    get(url: string, options: RequestParams): ApiResponse;
    post(url: string, options: RequestParams, config?: RequestHeaders): ApiResponse;
    setBearer(token: string): void;
}

export default ServiceInterface;