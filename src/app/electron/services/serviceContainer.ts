import { ConfigService, IPCService, LangService, PuppeteerService, StartupService } from ".";

export class ServiceContainer {
    private _ipcService: IPCService;
    private _lang: LangService;
    private _config: ConfigService;
    private _puppeteer: PuppeteerService;
    private _startup: StartupService;

    constructor() {
        this._ipcService = new IPCService();
        this._config = new ConfigService(this._ipcService);
        this._lang = new LangService(this._config);
        this._puppeteer = new PuppeteerService(this._ipcService);
        this._startup = new StartupService(this._ipcService, this._lang, this._config);
    }

    public get ipc() {
        return this._ipcService;
    }

    public get lang() {
        return this._lang;
    }

    public get config() {
        return this._config;
    }

    public get startup() {
        return this._startup;
    }

    public get puppeteer() {
        return this._puppeteer;
    }
}
