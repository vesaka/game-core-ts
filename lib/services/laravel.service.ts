import ServiceInterface from "@/core/lib/interfaces/service.interface";
import axios, { AxiosInstance } from "axios";
class LaravelService implements ServiceInterface {
    protected axios: AxiosInstance;

    constructor(options: ConnectOptions) {
        this.axios = axios.create();
        this.axios.defaults.baseURL = options.url
        this.axios.defaults.withCredentials = true;
        this.axios.defaults.headers.common['Content-Type'] = 'application/json';

        if(typeof options.headers === 'object' && null !== options.headers) {
            Object.assign(this.axios.defaults.headers.common, options.headers);
        }
        if(typeof options.params === 'object' && null !== options.params) {
            this.axios.defaults.params = options.params;
        }
    }

    connect(): ApiResponse {
        return this.axios.get('/sanctum/csrf-cookie');
    }

    get(url: string, params?: RequestParams): ApiResponse {
        return this.axios.get(url, { params });
    }

    post(url: string, params: RequestParams, config?: RequestHeaders): ApiResponse {
        return this.axios.post(url, params, config);
    }

    setBearer(token: string): void {
        if (token) {
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
}

export default LaravelService;
