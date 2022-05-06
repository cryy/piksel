import { RecoilService, ThemeService } from ".";

export class ServiceContainer {

    private _themeService: ThemeService;
    private _recoilService: RecoilService;

    constructor() {
        this._themeService = new ThemeService();
        this._recoilService = new RecoilService(this._themeService);
    }

    public get themeService() {
        return this._themeService;
    }

    public get recoilService() {
        return this._recoilService;
    }
}