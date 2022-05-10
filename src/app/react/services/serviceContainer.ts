import { LangService, RecoilService, ThemeService } from ".";

export class ServiceContainer {
    private _themeService: ThemeService;
    private _recoilService: RecoilService;
    private _langService: LangService;

    constructor() {
        this._themeService = new ThemeService();
        this._recoilService = new RecoilService();
        this._langService = new LangService();
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
}
