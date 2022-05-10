import { LangService, RecoilService, ThemeService, IPCService } from ".";

export class ServiceContainer {
    private _themeService: ThemeService;
    private _recoilService: RecoilService;
    private _langService: LangService;
    private _ipcService: IPCService;

    constructor() {
        this._themeService = new ThemeService();
        this._recoilService = new RecoilService();
        this._langService = new LangService();
        this._ipcService = new IPCService();
    }

    public get themeService() {
        return this._themeService;
    }

    public get recoilService() {
        return this._recoilService;
    }

    public get langService() {
        return this._langService;
    }

    public get ipc() {
        return this._ipcService;
    }
}
