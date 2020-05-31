import {AxiosResponse, default as http} from "axios";

export class HttpService<T> {

    private readonly _url: string;
    private readonly _api: string;
    private readonly _auth: { username: string, password: string };

    public constructor(username: string, password: string, url: string, api: string) {
        this._url = url;
        this._api = api;
        this._auth = {
            username,
            password,
        }
    }

    public async testAuthenticatedConnection(endpoint: string): Promise<void> {
        return this.getAll(endpoint).then((data: T) => {
            if (data !== undefined) {
                return Promise.resolve();
            } else {
                return Promise.reject("Authentication failed");
            }
        })
    }

    public async getOpenApiDocs(docsUrl: string): Promise<JSON> {
        return http.get(`${this._url}/${docsUrl}/openapi.json`)
            .then(({data}: AxiosResponse<JSON>) => data);
    }

    public async getAll(endpoint: string): Promise<T> {
        return http.get(`${this._url}/${this._api}/${endpoint}`, {
            auth: this._auth
        }).then(({data}: AxiosResponse<T>) => data);
    }

    public async get(endpoint: string, id: number): Promise<T> {
        return http.get(`${this._url}/${this._api}/${endpoint}/${id}`, {
            auth: this._auth
        }).then(({data}: AxiosResponse<T>) => data);
    }
}
