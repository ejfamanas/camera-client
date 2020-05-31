import * as http from "axios";

export class HttpService {
    private readonly _username: string;
    private readonly _password: string;
    private readonly _url: string;
    private readonly _api: string;

    public constructor(username: string, password: string, url: string, api: string) {
        this._username = username;
        this._password = password;
        this._url = url;
        this._api = api;
    }
}
