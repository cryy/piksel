import { IPCService, LangService, RecoilService, RouteService, ThemeService } from ".";

export class ServiceContainer {
    private _themeService: ThemeService;
    private _recoilService: RecoilService;
    private _langService: LangService;
    private _ipcService: IPCService;
    private _routeService: RouteService;

    constructor() {
        this._themeService = new ThemeService();
        this._recoilService = new RecoilService();
        this._langService = new LangService();
        this._ipcService = new IPCService();
        this._routeService = new RouteService();
    }

    public get theme() {
        return this._themeService;
    }

    public get recoil() {
        return this._recoilService;
    }

    public get lang() {
        return this._langService;
    }

    public get ipc() {
        return this._ipcService;
    }

    public get routes() {
        return this._routeService;
    }
}
