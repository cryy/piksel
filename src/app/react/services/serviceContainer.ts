import { ConfigService, IPCService, LangService, RecoilService, RouteService, StartupService, ThemeService } from ".";

export class ServiceContainer {
    private _themeService: ThemeService;
    private _recoilService: RecoilService;
    private _langService: LangService;
    private _ipcService: IPCService;
    private _routeService: RouteService;
    private _configService: ConfigService;
    private _startupService: StartupService;

    constructor() {
        this._themeService = new ThemeService();
        this._langService = new LangService();
        this._ipcService = new IPCService();
        this._recoilService = new RecoilService(this._ipcService);
        this._routeService = new RouteService();
        this._configService = new ConfigService(this._ipcService, this._recoilService);
        this._startupService = new StartupService(this._recoilService, this._ipcService, this._configService);
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

    public get startup() {
        return this._startupService;
    }

    public get config() {
        return this._configService;
    }
}
